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
import {UNSTACK_DUPES} from "./constants";

type Prop = {dummyInventory: InventoryItemType[]};

const SteamInventory: FC<Prop> = () => {
  const [inventory, setInventory] = useState([]);
  const [filters, setFilters] = useState<ItemType[]>([]);
  const [id, setId] = useState("76561198080636799");
  const [stack, setStack] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialInventory = async () => {
      setInventory(await getInitialInventory());
    };

    fetchInitialInventory().finally(() => {
      setLoading(false);
    });
  }, []);

  const handleStackDupes = () => (stack ? setStack(false) : setStack(true));

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);

  const handleSearch = async () => {
    setInventory(await getInventoryNode({steamId: id}));
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
    return !inventory || isLoading ? (
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
          name={UNSTACK_DUPES}
          label={UNSTACK_DUPES}
        />
      </div>

      {renderContent()}
    </>
  );
};

export default SteamInventory;
