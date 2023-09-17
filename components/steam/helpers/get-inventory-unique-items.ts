import {InventoryItemType} from "@/types";

type Props = {inventory: InventoryItemType[]};

export const getInventoryUniqueItems = ({
  inventory,
}: Props): InventoryItemType[] =>
  inventory &&
  Object.values(
    inventory.reduce((filteredItems: any, currentItem) => {
      const old = filteredItems[currentItem.name];
      if (!old) filteredItems[currentItem.name] = {...currentItem, count: 1};
      else filteredItems[currentItem.name].count++;
      return filteredItems;
    }, {})
  );
