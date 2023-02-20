import {
  InventoryList,
  inventoryUrl,
  SortedInventoryType,
} from "@/components/steam";
import {Loader} from "@/components/ui";
import {getInventory} from "@/data/dummy-inventory";
import {useEffect, useState} from "react";

const SteamInventory = ({dummyInventory = getInventory()}) => {
  const [inventory, setInventory] = useState(dummyInventory);
  const [sortedInventory, setSortedInventory] = useState<SortedInventoryType>();

  const handleSearch = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(inventoryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data && setInventory(data);
      });
  };

  useEffect(() => {
    const filterInventory = () => {
      return inventory.assets.map(({classid}) => {
        const {name, type, icon_url} = inventory.descriptions.filter(
          (descriptions) => classid === descriptions.classid
        )[0];

        return {
          type,
          name,
          classid,
          icon_url,
        };
      });
    };

    return setSortedInventory({
      inventory: filterInventory(),
      total_inventory_count: inventory.total_inventory_count,
    });
  }, [inventory]);

  if (!sortedInventory) {
    return <Loader />;
  }

  return (
    <>
      {sortedInventory && (
        <InventoryList items={sortedInventory} onSearch={handleSearch} />
      )}
    </>
  );
};

export default SteamInventory;
