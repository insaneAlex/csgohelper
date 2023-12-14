import {InventoryItemType} from '@/src/services/steam-inventory';
import {getAvailablePrice} from './get-available-price';

export const calculateInventoryPrice = ({items}: {items: InventoryItemType[]}) => {
  const total = items.reduce((accumulator, {prices, price}) => {
    const availablePrice = price ?? Number(getAvailablePrice(prices));
    return isNaN(availablePrice) ? accumulator : accumulator + availablePrice;
  }, 0);
  return total === 0 ? '' : total.toFixed(2);
};
