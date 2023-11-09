import {createUrl, fetch} from '@/src/services/network';
import {InventoryResponseType} from './types';
import {fetchInventoryUrl} from './constants';
import {SteamIDType} from '@/src/redux';

type Props = SteamIDType & {signal: AbortSignal; force?: boolean};

export const fetchInventory = ({steamid, force, signal}: Props) => {
  const getInventoryUrl = createUrl(fetchInventoryUrl, {steamid, force});

  return fetch.get<InventoryResponseType>(getInventoryUrl, {signal});
};
