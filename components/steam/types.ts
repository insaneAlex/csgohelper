export type SortedInventoryItemType = {
  type: string;
  name: string;
  classid: string;
  icon_url: string;
  count?: number;
};

export type ReadableInventoryType = {
  total_inventory_count: number;
  inventory: SortedInventoryItemType[];
};

export enum InventoryType {
  BaseGradeContainer = "Base Grade Container",
}
