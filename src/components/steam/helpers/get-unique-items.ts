import {getAvailablePrice} from './get-available-price';
import {InventoryItemType} from '@/src/services';

type Props = (arg: {inventory: InventoryItemType[]}) => InventoryItemType[];

export const getUniqueItems: Props = ({inventory}) =>
  Object.values(
    inventory.reduce((items: Record<string, InventoryItemType & {count: number; price: number}>, current) => {
      const {name, prices} = current;
      const price = getAvailablePrice(prices);

      if (!items[name]) items[name] = {...current, count: 1, price};
      else {
        const availablePrice = price ? items[name].price + price : items[name].price;
        items[name] = {...items[name], count: items[name].count + 1, price: availablePrice};
      }

      return items;
    }, {})
  );
