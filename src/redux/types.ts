import {InventoryItemType} from '@/types';

export type InventoryState = {
  items: InventoryItemType[];
  isLoading: boolean;
  hasError: boolean;
};
