import {STEAMID_PARAM, fetchInventoryUrl} from './constants';
import {InitialInventoryResponseType} from './types';
import {storage} from '@/src/services';

type fetchInitialInventoryType = (a: Props) => Promise<InitialInventoryResponseType>;
type Props = {signal: AbortSignal};

export const fetchInitialInventory: fetchInitialInventoryType = async ({signal}) => {
  const storedSteamid = storage.localStorage.get(STEAMID_PARAM);
  if (storedSteamid) {
    const url = storedSteamid && `${fetchInventoryUrl}?storedSteamid=${storedSteamid}`;

    const response = await fetch(url, {signal});
    return response.json();
  }
};
