import {getInventoryEndpoint} from "./constants";

export const getInventoryNode = async ({steamId}: {steamId: string}) => {
  const getInventoryUrl = `${getInventoryEndpoint}?steamid=${steamId}`;

  const response = await fetch(getInventoryUrl, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });

  return await response.json();
};
