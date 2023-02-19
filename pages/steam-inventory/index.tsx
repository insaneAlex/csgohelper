import {InventoryList} from "@/components/events/event-list/inventory-items";
import {getInventory} from "@/data/dummy-inventory";
import {useEffect, useMemo, useState} from "react";

const newSteamUrl =
  "https://steamcommunity.com/inventory/76561198080636799/730/2?l=english&count=1000";

const SteamInventory = () => {
  const dummyInventory = getInventory();
  const headers = useMemo(() => new Headers(), []);
  headers.append("Content-Type", "application/json");
  const [inventory, setInventory] = useState(dummyInventory);

  useEffect(() => {
    try {
      fetch(newSteamUrl, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          data && setInventory(data);
        });
    } catch (e) {
      throw new Error(e as undefined);
    }
  }, [headers]);

  return (
    <>
      <InventoryList inventory={inventory} />
    </>
  );
};

export default SteamInventory;
