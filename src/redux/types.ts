import {InventoryItemType} from '../services/steam-inventory';
import {InventoryStatuses} from './features/inventory';

export type SteamIDType = {steamid: string};
export type InventoryErrorType = null | string;

export type InventoryState = {
  error: InventoryErrorType;
  items: InventoryItemType[];
  status: InventoryStatuses;
  update_time?: string | null;
};
