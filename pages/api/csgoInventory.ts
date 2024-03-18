/* eslint-disable max-depth */
import {calculateInventoryWithPrices, getFormattedDate, minimizeInventory} from '@/server-helpers';
import {NextApiRequest, NextApiResponse} from 'next';
import {
  InventoryCacheType,
  NoPriceInventory,
  PriceCacheType,
  fetchCsPrices,
  inventoryApi,
  awsServices
} from '@/src/services';

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

      if (!(steamid in inventoryCache)) {
        const response = await awsServices.fetchFromDynamoDB(steamid, isSteamId64, inventoryCache, pricesCache.prices);
        return res.status(response.statusCode).json(response);
      }
      const {inventory, update_time, profile} = inventoryCache[steamid];
      return res.status(201).json({
        profile,
        update_time: update_time,
        shouldSaveSteamId: true,
        inventory: JSON.stringify(calculateInventoryWithPrices(inventory as NoPriceInventory, pricesCache.prices))
      });
    }
  } else {
    if (steamid in inventoryCache) {
      const {inventory, update_time, profile} = inventoryCache[steamid];
      return res.status(201).json({
        profile,
        update_time,
        shouldSaveSteamId: true,
        inventory: JSON.stringify(calculateInventoryWithPrices(inventory as NoPriceInventory, pricesCache.prices))
      });
    }
    const response = await awsServices.fetchFromDynamoDB(steamid, isSteamId64, inventoryCache, pricesCache.prices);
    return res.status(response.statusCode).json(response);
  }
};

export default handler;
