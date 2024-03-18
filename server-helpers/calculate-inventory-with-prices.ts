import {NoPriceInventory, PricesType} from '@/src/services/aws';

export const calculateInventoryWithPrices = (inventory: NoPriceInventory, prices: PricesType) =>
  prices ? inventory.map((item) => ({...item, prices: prices?.[item.market_hash_name]?.price})) : inventory;
