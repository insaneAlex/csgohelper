import {
  inventoryBase,
  InventoryFilters,
  InventoryList,
  inventoryRest,
  ReadableInventoryType,
} from "@/components/steam";
import {getInventoryUniqueItems} from "@/components/steam/helpers";
import {SearchInventory} from "@/components/steam/components/search-inventory";
import {Loader} from "@/components/ui";
import {
  DUMMY_INVENTORY,
  getInventory,
  InventoryType,
} from "@/data/dummy-inventory";
import {FC, useEffect, useState} from "react";
import {SortedInventoryItemType} from "@/components/steam/types";

const SteamInventory: FC<{dummyInventory: InventoryType}> = ({
  dummyInventory = DUMMY_INVENTORY,
}) => {
  const [inventory, setInventory] = useState(dummyInventory);
  const [id, setId] = useState("76561198080636799");
  const [sortedInventory, setSortedInventory] =
    useState<ReadableInventoryType>();

  const handleSearch = ({steamId}: {steamId?: string}) => {
    const getInventoryUrl = `${inventoryBase}/${steamId}/${inventoryRest}`;

    fetch(getInventoryUrl, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
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

    const sorted = filterInventory();
    return setSortedInventory({
      inventory: sorted,
      total_inventory_count: sorted.length,
    });
  }, [inventory]);

  const inventoryItems = sortedInventory?.inventory;

  const uniqueInventoryItems = getInventoryUniqueItems({
    inventory: inventoryItems as SortedInventoryItemType[],
  });

  if (!sortedInventory) {
    return <Loader />;
  }

  return (
    <>
      <SearchInventory
        id={id}
        onSearch={() => handleSearch({steamId: id})}
        onIdChange={(e) => setId(e.target.value)}
      />
      <InventoryFilters />
      <InventoryList items={{inventory: uniqueInventoryItems}} />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {dummyInventory: getInventory()},
  };
};

export default SteamInventory;
