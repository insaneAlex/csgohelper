import {InventoryItemType} from '@/types';

type Props = ({inventory}: {inventory: InventoryItemType[]}) => InventoryItemType[];

export const getInventoryUniqueItems: Props = ({inventory}) =>
  Object.values(
    inventory?.reduce((items: any, current) => {
      const withCounter = items[current.name];
      if (!withCounter) items[current.name] = {...current, count: 1};
      else items[current.name].count++;
      return items;
    }, {})
  );
