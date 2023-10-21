import {PriceOptions} from '@/api/types';
import {InventoryItemType} from '@/types';

export const calculateInventoryPrice = ({items}: {items: InventoryItemType[]}) => {
  const total = items.reduce((accumulator, currentValue) => {
    const price = Number(currentValue.prices?.[PriceOptions.WEEK]?.median);
    const count = currentValue?.count || 1;
    return isNaN(price) ? accumulator : accumulator + price * count;
  }, 0);
  return total === 0 ? '' : total.toFixed(2);
};
