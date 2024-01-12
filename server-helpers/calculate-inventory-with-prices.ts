import {NoPriceInventory} from '@/pages/api/csgoInventory';
import {InventoryItemType} from '@/src/services';
import {PricesType} from '@/src/services/aws/types';

export const calculateInventoryWithPrices = (inventory: NoPriceInventory, prices: PricesType) => {
  return (
    prices ? inventory.map((item) => ({...item, prices: prices?.[item.market_hash_name]?.price})) : inventory
  ) as InventoryItemType[];
};
