import {CS2InventoryFetchErrorType} from '@/pages/api/csgoInventory';
import {InventoryItemType} from '../services/steam-inventory';

export type SteamIDType = {steamid: string};
export type InventoryErrorType = null | string | CS2InventoryFetchErrorType;

export type InventoryState = {
  isLoading: boolean;
  initLoading: boolean;
  error: InventoryErrorType;
  items: InventoryItemType[];
  update_time?: string | null;
};
