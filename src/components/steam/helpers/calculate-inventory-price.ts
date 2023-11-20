import {InventoryItemType} from '@/src/services/steam-inventory';
import {getAvailablePrice} from './get-available-price';

export const calculateInventoryPrice = ({items}: {items: InventoryItemType[]}) => {
  const total = items.reduce((accumulator, {prices, count}) => {
    const price = Number(getAvailablePrice(prices));
    return isNaN(price) ? accumulator : accumulator + price * (count || 1);
  }, 0);
  return total === 0 ? '' : total.toFixed(2);
};
