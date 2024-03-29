export enum InventoryStatuses {
  IDLE = 'idle',
  INIT_LOAD = 'Init loading',
  FORCE_LOAD = 'Force loading',
  NO_PROFILE = 'Request failed with status 404',
  PRIVATE_INVENTORY = 'Request failed with status 403'
}

export type GetInventoryPayloadType = {steamid: {isSteamId64: boolean; value: string}; isForceUpdate?: boolean};
