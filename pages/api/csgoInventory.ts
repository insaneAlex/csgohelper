import {awsServices, fetchPrices, PriceCacheType, InventoryItemType, inventoryApi} from '@/src/services';
import {calculateInventoryWithPrices, getFormattedDate, minimizeInventory} from '@/server-helpers';
import {NextApiRequest, NextApiResponse} from 'next';
import {SteamProfileType} from '@/core/types';

type InventoryRecordType = {inventory?: NoPriceInventory; update_time?: string; profile?: SteamProfileType};
export type NoPriceInventory = Omit<InventoryItemType, 'prices'>[];
export type inventoryCacheType = Record<string, InventoryRecordType>;

const THIRD_OF_THE_DAY = 8 * 60 * 60 * 1000;
export const pricesCache: PriceCacheType = {prices: null, lastUpdated: null};
export const inventoryCache: inventoryCacheType = {};

// eslint-disable-next-line max-statements, complexity
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid, isForceUpdate} = req.query as unknown as {steamid: string; isForceUpdate: boolean};
  if (!steamid) {
    return res.status(400).json({inventory: '[]', error: 'BAD_REQUEST'});
  }

  const now = new Date();
  if (
    !pricesCache.prices ||
    !pricesCache.lastUpdated ||
    now.getTime() - pricesCache.lastUpdated.getTime() > THIRD_OF_THE_DAY
  ) {
    await fetchPrices({cache: pricesCache});
  }

  if (isForceUpdate) {
    try {
      const items = await inventoryApi.get({steamid});
      const profile = await inventoryApi.getProfile({steamid});
      const minimizedInventory = minimizeInventory(items);
      const update_time = getFormattedDate(new Date());
      const withPrices = calculateInventoryWithPrices(minimizedInventory, pricesCache.prices);

      const {isSaved} = await awsServices.updateDynamoInventoryRecord(
        steamid,
        minimizedInventory,
        update_time,
        profile
      );
      inventoryCache[steamid] = {inventory: minimizedInventory, update_time, profile} as inventoryCacheType;
      return res.status(200).json({
        profile,
        shouldSaveSteamId: isSaved,
        inventory: JSON.stringify(withPrices)
      });
    } catch (e) {
      const error = (e as {response?: {status?: number}}) || {};
      console.error(e);
      // eslint-disable-next-line max-depth
      if (error?.response?.status === 404) {
        return res.status(404).json({inventory: '[]'});
      }
      // eslint-disable-next-line max-depth
      if (error?.response?.status === 403) {
        return res.status(403).json({inventory: '[]'});
      }

      // eslint-disable-next-line max-depth
      if (!(steamid in inventoryCache)) {
        const response = await awsServices.fetchFromDynamoDB(steamid, inventoryCache, pricesCache.prices);
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
    const response = await awsServices.fetchFromDynamoDB(steamid, inventoryCache, pricesCache.prices);
    return res.status(response.statusCode).json(response);
  }
};

export default handler;
