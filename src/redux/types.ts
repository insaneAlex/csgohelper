import {InventoryItemType} from '@/types';
import {PriceType} from '../services/types';

export type SteamIDType = {steamid: string};

export type InventoryState = {
  update_time?: string | null;
  items: InventoryItemType[];
  prices: {[key: string]: PriceType} | [];
  isLoading: boolean;
  error: any;
};
