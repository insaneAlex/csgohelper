import {getInventoryEndpoint} from './constants';

export const fetchInitialInventory = async ({signal}: {signal: AbortSignal}) => {
  const response = await fetch(getInventoryEndpoint, {signal});
  return response.json();
};

export const fetchInventory = async ({steamid, signal}: {steamid?: string; signal: AbortSignal}) => {
  const getInventoryUrl = `${getInventoryEndpoint}?steamid=${steamid}`;

  const response = await fetch(getInventoryUrl, {signal});
  return response.json();
};
