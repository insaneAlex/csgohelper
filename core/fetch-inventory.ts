import {InventoryResponseType} from './types';
import {fetchInventoryUrl} from './constants';
import {SteamIDType} from '@/src/redux';

type fetchInventoryType = (arg: Props) => Promise<InventoryResponseType>;

type Props = SteamIDType & {signal: AbortSignal};
export const fetchInventory: fetchInventoryType = async ({steamid, signal}) => {
  const url = `${fetchInventoryUrl}?steamid=${steamid}`;

  const response = await fetch(url, {signal});
  return response.json();
};
