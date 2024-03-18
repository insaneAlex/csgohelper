import {InventoryCacheType, NoPriceInventory, PriceCacheType, awsServices} from '@/src/services';
import {calculateInventoryWithPrices} from './calculate-inventory-with-prices';

export const getSavedInventory = async (
  cache: InventoryCacheType,
  pricesCache: PriceCacheType,
  inventoryId: string,
  isSteamId64: boolean
) => {
  if (inventoryId in cache) {
    const {inventory, update_time, profile} = cache[inventoryId];
    return {
      profile,
      update_time,
      statusCode: 201,
      shouldSaveSteamId: true,
      inventory: JSON.stringify(calculateInventoryWithPrices(inventory as NoPriceInventory, pricesCache.prices))
    };
  }
  return await awsServices.fetchFromDynamoDB(inventoryId, isSteamId64, cache, pricesCache.prices);
};
