import {
  inventoryBase,
  InventoryList,
  inventoryRest,
  ReadableInventoryType,
} from "@/components/steam";
import {
  filterInventoryByType,
  getInventoryUniqueItems,
} from "@/components/steam/helpers";
import {InventoryType} from "@/components/steam/types";
import {Loader} from "@/components/ui";
import {getInventory} from "@/data/dummy-inventory";
import {FC, useEffect, useState} from "react";

const SteamInventory: FC<{dummyInventory: InventoryType}> = ({
  dummyInventory,
}) => {
  const [inventory, setInventory] = useState(dummyInventory);
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
    inventory: inventoryItems,
  });

  if (!sortedInventory) {
    return <Loader />;
  }

  return (
    <InventoryList
      items={{
        inventory: filterInventoryByType({
          inventory: uniqueInventoryItems,
          type: InventoryType.BaseGradeContainer,
        }),
      }}
      onSearch={handleSearch}
    />
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dummyInventory: getInventory(),
    },
  };
};

export default SteamInventory;
