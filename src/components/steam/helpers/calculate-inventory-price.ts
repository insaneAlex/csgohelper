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
    return isNaN(price) ? accumulator : accumulator + price * (count || 1);
  }, 0);
  return total === 0 ? '' : total.toFixed(2);
};
