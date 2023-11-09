import {GetInventoryPayloadType} from '@/src/redux/features';
import {createUrl, fetch} from '@/src/services/network';
import {InventoryResponseType} from './types';
import {fetchInventoryUrl} from './constants';

type Props = GetInventoryPayloadType & {signal: AbortSignal};

export const fetchInventory = ({steamid, force, signal}: Props) => {
  const getInventoryUrl = createUrl(fetchInventoryUrl, {steamid, force});

  return fetch.get<InventoryResponseType>(getInventoryUrl, {signal});
};
