import {GetInventoryPayloadType} from '@/src/redux/features';
import {createUrl, fetch} from '@/src/services/network';
import {InventoryResponseType} from './types';
import {fetchInventoryUrl} from './constants';

type Props = GetInventoryPayloadType & {signal: AbortSignal};

export const fetchInventory = ({steamid, isForceUpdate, signal}: Props) => {
  const getInventoryUrl = createUrl(fetchInventoryUrl, {steamid, isForceUpdate});

  return fetch.get<InventoryResponseType>(getInventoryUrl, {signal});
};
