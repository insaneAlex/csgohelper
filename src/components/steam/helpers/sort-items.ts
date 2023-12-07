import {InventoryItemType} from '@/src/services';
import {getAvailablePrice} from './get-available-price';
import {SortTypes} from '../components';

export const sortItems = ({items, sortType}: {items: InventoryItemType[]; sortType: string}) =>
  [...items].sort((a, b) => {
    const priceA = getAvailablePrice(a?.prices) * (a.count || 1);
    const priceB = getAvailablePrice(b?.prices) * (b.count || 1);

    if ((priceA === undefined || isNaN(priceA)) && priceB !== undefined) {
      return 1;
    } else if (priceA !== undefined && (priceB === undefined || isNaN(priceB))) {
      return -1;
    }
    return sortType === SortTypes.LowPrice ? priceA - priceB : priceB - priceA;
  });
