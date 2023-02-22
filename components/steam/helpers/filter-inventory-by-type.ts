import {InventoryType, SortedInventoryItemType} from "../types";

export const filterInventoryByType = ({
  inventory,
  type,
}: {
  inventory: SortedInventoryItemType[];
  type: InventoryType;
}) => {
  return inventory.filter((item) => item.type === type);
};
