import {GetInventoryPayloadType} from '@/src/redux/features';
import {createUrl, fetch} from '@/src/services/network';
import {InventoryResponseType} from './types';
import {fetchInventoryUrl} from './constants';

type Props = GetInventoryPayloadType & {signal: AbortSignal};

export const fetchInventory = ({steamid, isForceUpdate, signal}: Props) => {
  const getInventoryUrl = createUrl(fetchInventoryUrl, {
    isSteamId64: steamid.isSteamId64,
    steamid: steamid.value,
    isForceUpdate
  });

  return fetch.get<InventoryResponseType>(getInventoryUrl, {signal});
};
