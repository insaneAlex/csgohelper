import {SteamIDType} from '@/src/redux';
import {fetchInventoryUrl} from './constants';
import {InitialInventoryResponseType} from './types';

type fetchInitialInventoryType = (a: SteamIDType & {signal: AbortSignal}) => Promise<InitialInventoryResponseType>;

export const fetchInitialInventory: fetchInitialInventoryType = async ({steamid, signal}) => {
  const url = `${fetchInventoryUrl}?storedSteamid=${steamid}`;

  const response = await fetch(url, {signal});
  return response.json();
};
