import {PricesType} from '@/api/types';
import {InventoryItemType} from '@/types';

export type InventoryState = {
  update_time?: string | null;
  items: InventoryItemType[];
  prices: PricesType | [];
  isLoading: boolean;
  error: any;
};
