import {inventoryBase, inventoryRest} from "@/components/steam";
import {GetInventoryPayload} from "./types";

export const getInventoryR = async ({steamId}: GetInventoryPayload) => {
  const getInventoryUrl = `${inventoryBase}/${steamId}/${inventoryRest}`;
  const response = await fetch(getInventoryUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
};
