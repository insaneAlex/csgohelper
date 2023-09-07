import { inventoryBase } from "./constants";
import { GetInventoryPayload } from "./types";

export const getSteamInventory = async ({ steamId }: GetInventoryPayload) => {
  const getInventoryUrl = `${inventoryBase}/${steamId}/730/2?l=english&count=1000`;
  const response = await fetch(getInventoryUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
};