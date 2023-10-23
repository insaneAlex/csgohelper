import {storage} from '@/src/services';
import {STEAMID_PARAM, fetchInventoryUrl} from './constants';

export type InitialInvResType = {inventory: string; update_time: string};
export type InventoryResType = {
  error?: {steamAccountFetchError?: string; dynamoDBAccountFetchError?: string};
  update_time?: string;
  statusCode: number;
  inventory: string;
};

type InitialInvReqType = {signal: AbortSignal};
type InvReqType = {steamid?: string; signal: AbortSignal};

export const fetchInitialInventory = async ({signal}: InitialInvReqType): Promise<InitialInvResType> => {
  const storedSteamid = storage.localStorage.get(STEAMID_PARAM);
  const url = storedSteamid && `${fetchInventoryUrl}?storedSteamid=${storedSteamid}`;

  const response = await fetch(url, {signal});
  return response.json();
};

export const fetchInventory = async ({steamid, signal}: InvReqType): Promise<InventoryResType> => {
  const url = `${fetchInventoryUrl}?steamid=${steamid}`;

  const response = await fetch(url, {signal});
  return response.json();
};
