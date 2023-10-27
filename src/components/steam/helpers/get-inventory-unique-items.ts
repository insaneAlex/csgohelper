import {InventoryItemType} from '@/types';

type Props = (arg: {inventory: InventoryItemType[]}) => InventoryItemType[];

export const getInventoryUniqueItems: Props = ({inventory}) =>
  Object.values(
    inventory.reduce((items: Record<string, InventoryItemType>, current) => {
      const withCounter = items[current.name];
      if (!withCounter) items[current.name] = {...current, count: 1};
      else (items[current.name] as InventoryItemType & {count: number}).count++;
      return items;
    }, {})
  );
