import {getInventoryEndpoint} from './constants';

export const fetchInitialInventory = async () => {
  const response = await fetch(getInventoryEndpoint);
  return response.json();
};

export const fetchInventory = async ({steamid}: {steamid?: string}) => {
  const getInventoryUrl = `${getInventoryEndpoint}?steamid=${steamid}`;

  const response = await fetch(getInventoryUrl);
  return response.json();
};
