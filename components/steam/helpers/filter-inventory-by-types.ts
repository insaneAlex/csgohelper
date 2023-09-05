import { InventoryItemType, SortedInventoryItemType } from "../types";

export const filterInventoryByTypes = ({
  inventory,
  types,
}: {
  inventory: SortedInventoryItemType[];
  types: InventoryItemType[];
}) => {
  console.log(types);

  return inventory.filter(({ type }) =>
    types?.includes(type as InventoryItemType)
  );
};
