import {InventoryResponseType} from './types';
import {fetchInventoryUrl} from './constants';

type fetchInventoryType = (arg: Props) => Promise<InventoryResponseType>;

type Props = {steamid?: string; signal: AbortSignal};
export const fetchInventory: fetchInventoryType = async ({steamid, signal}) => {
  const url = `${fetchInventoryUrl}?steamid=${steamid}`;

  const response = await fetch(url, {signal});
  return response.json();
};
