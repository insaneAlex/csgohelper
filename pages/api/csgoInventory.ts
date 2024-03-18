/* eslint-disable max-depth */
import {InventoryCacheType, PriceCacheType, fetchCsPrices, inventoryApi, awsServices} from '@/src/services';
import {calculateInventoryWithPrices, getFormattedDate, minimizeInventory} from '@/server-helpers';
import {getSavedInventory} from '@/server-helpers/get-saved-inventory';
import {NextApiRequest, NextApiResponse} from 'next';

const THIRD_OF_THE_DAY = 8 * 60 * 60 * 1000;
export const pricesCache: PriceCacheType = {prices: null, lastUpdated: null};
export const inventoryCache: InventoryCacheType = {};

// TODO: refactor and fix lint errors
// eslint-disable-next-line max-statements, complexity
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid, isForceUpdate} = req.query as unknown as {
    isSteamId64: string;
    steamid: string;
    isForceUpdate: boolean;
  };
  const isSteamId64 = JSON.parse(req.query.isSteamId64 as string);

  if (!steamid) {
    return res.status(400).json({inventory: '[]', error: 'BAD_REQUEST'});
  }

  const now = new Date();
  if (
    !pricesCache.prices ||
    !pricesCache.lastUpdated ||
    now.getTime() - pricesCache.lastUpdated.getTime() > THIRD_OF_THE_DAY
  ) {
    await fetchCsPrices({cache: pricesCache});
  }

  if (isForceUpdate) {
    try {
      let steamId64 = steamid;

      if (!isSteamId64) {
        const {response} = await inventoryApi.getSteamIdByCustomUrl({steamid});
        steamId64 = response.steamid;
      }
      const items = await inventoryApi.get({steamid: steamId64});
      const profile = await inventoryApi.getProfile({steamid: steamId64});

      const minimizedInventory = minimizeInventory(items);
      const update_time = getFormattedDate(new Date());
      const withPrices = calculateInventoryWithPrices(minimizedInventory, pricesCache.prices);

      const {isSaved} = await awsServices.updateDynamoInventoryRecord(
        {steamid, steamId64},
        isSteamId64,
        minimizedInventory,
        update_time,
        profile
      );
      inventoryCache[steamId64 || steamid] = {inventory: minimizedInventory, update_time, profile};
      return res.status(200).json({profile, shouldSaveSteamId: isSaved, inventory: JSON.stringify(withPrices)});
    } catch (e) {
      const error = (e as {response?: {status?: number}}) || {};
      console.error(e);
      if (error?.response?.status === 404) {
        return res.status(404).json({inventory: '[]'});
      }
      if (error?.response?.status === 403) {
        return res.status(403).json({inventory: '[]'});
      }
      const response = await getSavedInventory(inventoryCache, pricesCache, steamid, isSteamId64);
      return res.status(response?.statusCode || 201).json(response);
    }
  } else {
    const response = await getSavedInventory(inventoryCache, pricesCache, steamid, isSteamId64);
    return res.status(response?.statusCode || 201).json(response);
  }
};

export default handler;
