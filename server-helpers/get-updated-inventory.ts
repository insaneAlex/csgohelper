import {InventoryCacheType, PriceCacheType, awsServices, inventoryApi} from '@/src/services';
import {calculateInventoryWithPrices} from './calculate-inventory-with-prices';
import {minimizeInventory} from './minimize-inventory';
import {getFormattedDate} from './get-formatted-date';

export const getUpdatedInventory = async (
  steamid: string,
  isSteamId64: boolean,
  pricesCache: PriceCacheType,
  cache: InventoryCacheType
) => {
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

  cache[isSteamId64 ? steamId64 : steamid] = {inventory: minimizedInventory, update_time, profile};

  return {profile, shouldSaveSteamId: isSaved, inventory: JSON.stringify(withPrices)};
};
