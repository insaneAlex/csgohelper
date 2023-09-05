import {InventoryItemType, SortedInventoryItemType} from "../types";

export const filterInventoryByTypes = ({
  inventory,
  types,
}: {
  inventory: SortedInventoryItemType[];
  types: InventoryItemType[];
}) => inventory.filter(({type}) => types.includes(type as InventoryItemType));
