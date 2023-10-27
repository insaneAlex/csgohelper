import {InventoryItemType} from '@/types';
import {CS2InventoryFetchErrorType} from '@/pages/api/csgoInventory';

export type SteamIDType = {steamid: string};
export type InventoryErrorType = null | string | CS2InventoryFetchErrorType;

export type InventoryState = {
  isLoading: boolean;
  error: InventoryErrorType;
  items: InventoryItemType[];
  update_time?: string | null;
};
