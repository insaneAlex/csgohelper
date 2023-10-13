import {InventoryItemType} from '@/types';

export type InventoryState = {
  items: InventoryItemType[];
  isLoading: boolean;
  error: any;
  update_time?: string | null;
  prices: any[];
};
