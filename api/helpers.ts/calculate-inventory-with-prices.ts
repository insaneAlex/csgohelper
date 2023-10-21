import {InventoryItemType} from '@/types';

export const calculateInventoryWithPrices = ({
  inventory,
  prices
}: {
  inventory: InventoryItemType[];
  prices: {[key: string]: {price: any}} | null;
}) => {
  if (prices) {
    return inventory.map((item) => ({...item, prices: prices[item.market_hash_name].price}));
  }
  return inventory;
};
