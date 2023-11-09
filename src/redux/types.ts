import {InventoryItemType} from '../services/steam-inventory';
import {InventoryStatuses} from './features/inventory';

export type SteamIDType = {steamid: string};

export type InventoryState = {
  items: InventoryItemType[];
  status: InventoryStatuses;
  update_time?: string | null;
};
