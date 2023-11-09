import {SteamIDType} from '../../types';

export enum InventoryStatuses {
  IDLE = 'idle',
  INIT_LOAD = 'Init loading',
  FORCE_LOAD = 'Force loading',
  NO_PROFILE = 'Profile not found',
  PRIVATE_INVENTORY = 'Private inventory'
}

export type GetInventoryPayloadType = SteamIDType & {force?: boolean};
