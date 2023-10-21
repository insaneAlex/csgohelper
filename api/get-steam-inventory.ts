import {storage} from '@/src/services';
import {STEAMID_PARAM, getInventoryEndpoint} from './constants';

export type InitialInvResType = {inventory: string; update_time: string};
export type InventoryResType = {inventory: string; statusCode: number; update_time?: string};

type InitialInvReqType = {signal: AbortSignal};
type InvReqType = {steamid?: string; signal: AbortSignal};

export const fetchInitialInventory = async ({signal}: InitialInvReqType): Promise<InitialInvResType> => {
  const steamId = storage.localStorage.get(STEAMID_PARAM);
  const url = steamId ? `${getInventoryEndpoint}?steamId=${steamId}` : (getInventoryEndpoint as string);

  const response = await fetch(url, {signal});
  return response.json();
};

export const fetchInventory = async ({steamid, signal}: InvReqType): Promise<InventoryResType> => {
  const url = `${getInventoryEndpoint}?steamid=${steamid}`;

  const response = await fetch(url, {signal});
  return response.json();
};
