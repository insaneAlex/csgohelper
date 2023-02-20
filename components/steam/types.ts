export type SortedInventoryItemType = {
  type: string;
  name: string;
  classid: string;
  icon_url: string;
};

export type SortedInventoryType = {
  total_inventory_count: number;
  inventory: SortedInventoryItemType[];
};
