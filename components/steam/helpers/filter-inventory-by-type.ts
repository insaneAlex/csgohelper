import {InventoryItemType, SortedInventoryItemType} from "../types";

export const filterInventoryByType = ({
  inventory,
  type,
}: {
  inventory: SortedInventoryItemType[];
  type: InventoryItemType;
}) => {
  return inventory.filter((item) => item.type === type);
};
