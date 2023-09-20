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

type Props = {initialInventory: InventoryItemType[]};

const SteamInventory: FC<Props> = ({initialInventory}) => {
  const [inventory, setInventory] = useState(initialInventory);
  const [filters, setFilters] = useState<ItemType[]>([]);
  const [id, setId] = useState("76561198080636799");
  const [stack, setStack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialInventory = async () => {
      setIsLoading(true);
      const {inventory} = await getInitialInventory();
      setInventory(inventory);
    };

    initialInventory.length === 0 &&
      fetchInitialInventory()
        .catch((e) => {
          console.log(new Error(e));
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [initialInventory.length]);

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
    return !inventory || isLoading ? (
      <Loader />
    ) : (
      <ResponsiveInventoryList items={uniqueInventoryItems} />
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

export async function getStaticProps() {
  const {inventory} = await getInitialInventory();

  return {props: {initialInventory: inventory}};
}

export default SteamInventory;
