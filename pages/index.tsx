import {
  InventoryFilters,
  ResponsiveInventoryList,
  SearchInventory,
} from "@/components/steam";
import {
  filterInventoryByTypes,
  getInventoryUniqueItems,
} from "@/components/steam/helpers";
import {Loader, Checkbox} from "@/components/ui";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {getInitialInventory, getInventoryNode} from "@/api";
import {InventoryItemType, ItemType} from "@/types";
import {DUMMY_INVENTORY} from "@/dummy/data";

type Props = {initialInventory: InventoryItemType[]};

const SteamInventory: FC<Props> = ({initialInventory = DUMMY_INVENTORY}) => {
  const [inventory, setInventory] = useState<InventoryItemType[]>([]);
  const [filters, setFilters] = useState<ItemType[]>([]);
  const [id, setId] = useState("76561198080636799");
  const [stack, setStack] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialInventory = async () => {
      setIsLoading(true);
      const {inventory} = await getInitialInventory();
      setInventory(inventory || initialInventory);
    };

    fetchInitialInventory()
      .catch((e) => {
        console.log(new Error(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [initialInventory]);

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

  const handleChangeFilters = (filters: ItemType[]) => {
    setFilters(filters);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (uniqueInventoryItems.length === 0 && filters.length > 0) {
      return <>No items with such filters</>;
    }

    if (uniqueInventoryItems.length > 0) {
      return <ResponsiveInventoryList items={uniqueInventoryItems} />;
    }
  };

  return (
    <>
      <SearchInventory
        id={id}
        onSearch={handleSearch}
        onIdChange={handleIdChange}
      />
      <InventoryFilters filters={filters} setFilter={handleChangeFilters} />
      <div style={{maxWidth: "160px"}}>
        <Checkbox
          onChange={handleStackDupes}
          checked={stack}
          name="STACK DUPES"
          label="STACK DUPES"
        />
      </div>
      {renderContent()}
    </>
  );
};

export default SteamInventory;
