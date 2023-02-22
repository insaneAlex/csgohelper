import {SortedInventoryItemType} from "../types";

type Props = {inventory: SortedInventoryItemType[]};

export const getInventoryUniqueItems = ({
  inventory,
}: Props): SortedInventoryItemType[] =>
  Object.values(
    inventory.reduce((filteredItems: any, currentItem) => {
      const old = filteredItems[currentItem.name];
      if (!old) filteredItems[currentItem.name] = {...currentItem, count: 1};
      else filteredItems[currentItem.name].count++;
      return filteredItems;
    }, {})
  );
