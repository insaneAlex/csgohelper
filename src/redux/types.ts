import {InventoryItemType} from '../services/steam-inventory';
import {InventoryStatuses} from './features/inventory';
import {SteamProfileType} from '@/core/types';

export type SteamIDType = {steamid: string};

export type InventoryState = {
  items: InventoryItemType[];
  status: InventoryStatuses;
  profile: null | SteamProfileType;
  update_time?: string | null;
};
