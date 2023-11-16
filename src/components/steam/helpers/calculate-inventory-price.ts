import {InventoryItemType} from '@/src/services/steam-inventory';
import {PriceOptions} from '../types';

export const calculateInventoryPrice = ({items}: {items: InventoryItemType[]}) => {
  const total = items.reduce((accumulator, {prices, count}) => {
    const availablePrice =
      prices?.[PriceOptions.DAY] ||
      prices?.[PriceOptions.WEEK] ||
      prices?.[PriceOptions.MONTH] ||
      prices?.[PriceOptions.ALL];

    const price = Number(availablePrice?.average);
    const amount = count || 1;
    return isNaN(price) ? accumulator : accumulator + price * amount;
  }, 0);
  return total === 0 ? '' : total.toFixed(2);
};
