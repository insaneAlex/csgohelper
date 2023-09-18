import {InventoryFilters, InventoryList} from "@/components/steam";
import {
  filterInventoryByTypes,
  getInventoryUniqueItems,
} from "@/components/steam/helpers";
import {SearchInventory} from "@/components/steam/components";
import {Loader, Checkbox} from "@/components/ui";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {getInitialInventory, getInventoryNode} from "@/api";
import {InventoryItemType, ItemType} from "@/types";

type Prop = {dummyInventory: InventoryItemType[]};

const SteamInventory: FC<Prop> = () => {
  const [inventory, setInventory] = useState([]);
  const [filters, setFilters] = useState<ItemType[]>([]);
  const [id, setId] = useState("76561198080636799");
  const [stack, setStack] = useState(true);

  useEffect(() => {
    const fetchInitialInventory = async () => {
      const {inventory} = await getInitialInventory();
      setInventory(inventory);
    };

    fetchInitialInventory().catch((e) => {
      console.log(new Error(e));
    });
  }, []);

  const handleStackDupes = () => (stack ? setStack(false) : setStack(true));

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);

  const handleSearch = async () => {
    const resp = await getInventoryNode({steamId: id});

    setInventory(resp?.inventory || []);
  };

  let uniqueInventoryItems = stack
    ? getInventoryUniqueItems({inventory})
    : inventory;

  if (filters.length > 0) {
    uniqueInventoryItems = filterInventoryByTypes({
      inventory: uniqueInventoryItems,
      types: filters,
    });
  }

  const renderContent = () => {
    return !inventory ? (
      <Loader />
    ) : (
      <InventoryList items={uniqueInventoryItems} />
    );
  };

  return (
    <>
      <SearchInventory
        id={id}
        onSearch={handleSearch}
        onIdChange={handleIdChange}
      />
      <InventoryFilters filters={filters} setFilter={setFilters} />
      <div style={{maxWidth: "200px"}}>
        <Checkbox
          onChange={handleStackDupes}
          checked={!stack}
          name="UNSTACK DUPES"
          label="UNSTACK DUPES"
        />
      </div>

      {renderContent()}
    </>
  );
};

export default SteamInventory;
