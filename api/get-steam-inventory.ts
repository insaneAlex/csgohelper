import {inventoryBase, getInventoryEndpoint} from "./constants";

type Props = {steamId: string};

export const getSteamInventory = async ({steamId}: Props) => {
  const getInventoryUrl = `${inventoryBase}/${steamId}/730/2?l=english&count=1000`;
  const response = await fetch(getInventoryUrl, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });

  return await response.json();
};

export const getInventoryNode = async ({steamId}: Props) => {
  const getInventoryUrl = `${getInventoryEndpoint}?steamid=${steamId}`;

  const response = await fetch(getInventoryUrl, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });

  return await response.json();
};
