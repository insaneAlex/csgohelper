import {getInventoryEndpoint} from "./constants";

export const getInitialInventory = async () => {
  const response = await fetch(getInventoryEndpoint, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });

  return await response.json();
};

export const getInventoryNode = async ({steamId}: {steamId?: string}) => {
  const getInventoryUrl = `${getInventoryEndpoint}?steamid=${steamId}`;

  try {
    const response = await fetch(getInventoryUrl, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    return response.json();
  } catch (e) {
    console.log("Something horrible happened");
  }
};
