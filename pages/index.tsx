import {
  InventoryFilters,
  InventoryList,
  ReadableInventoryType,
} from "@/components/steam";
import {
  filterInventoryByTypes,
  getInventoryUniqueItems,
} from "@/components/steam/helpers";
import { SearchInventory } from "@/components/steam/components";
import { Loader } from "@/components/ui";
import {
  DUMMY_INVENTORY,
  getInventory,
  InventoryType,
} from "@/data/dummy-inventory";
import { FC, useEffect, useState } from "react";
import {
  InventoryItemType,
  SortedInventoryItemType,
} from "@/components/steam/types";
import { getSteamInventory } from "@/api/get-steam-inventory";
import { GetInventoryPayload } from "@/api/types";

const SteamInventory: FC<{ dummyInventory: InventoryType }> = ({
  dummyInventory = DUMMY_INVENTORY,
}) => {
  const [inventory, setInventory] = useState(dummyInventory);
  const [filters, setFilters] = useState([] as InventoryItemType[]);
  const [id, setId] = useState("76561198080636799");
  const [sortedInventory, setSortedInventory] =
    useState<ReadableInventoryType>();

  const handleSearch = async ({ steamId }: GetInventoryPayload) => {
    setInventory(await getSteamInventory({ steamId }));
  };

  useEffect(() => {
    const filterInventory = () => {
      return inventory.assets.map(({ classid }) => {
        const { name, type, icon_url } = inventory.descriptions.filter(
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

  let uniqueInventoryItems = getInventoryUniqueItems({
    inventory: inventoryItems as SortedInventoryItemType[],
  });

  if (!sortedInventory) {
    return <Loader />;
  }
  if (filters.length > 0) {
    uniqueInventoryItems = filterInventoryByTypes({
      inventory: uniqueInventoryItems,
      types: filters,
    });
  }

  return (
    <>
      <SearchInventory
        id={id}
        onSearch={() => handleSearch({ steamId: id })}
        onIdChange={(e) => setId(e.target.value)}
      />
      <InventoryFilters filters={filters} setFilter={setFilters} />
      <InventoryList items={{ inventory: uniqueInventoryItems }} />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: { dummyInventory: getInventory() },
  };
};

export default SteamInventory;
