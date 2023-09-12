import {InventoryFilters, InventoryList} from "@/components/steam";
import {
  filterInventoryByTypes,
  getInventoryUniqueItems,
} from "@/components/steam/helpers";
import {SearchInventory} from "@/components/steam/components";
import {Button, Loader} from "@/components/ui";
import {ChangeEvent, FC, useState} from "react";
import {getInventoryNode} from "@/api/get-steam-inventory";
import {DUMMY_INVENTORY} from "@/data";
import {InventoryItemType, ItemType} from "@/data/dummy-inventory";

type Prop = {dummyInventory: InventoryItemType[]};

const SteamInventory: FC<Prop> = ({dummyInventory = DUMMY_INVENTORY}) => {
  const [inventory, setInventory] = useState(dummyInventory);
  const [filters, setFilters] = useState<ItemType[]>([]);
  const [id, setId] = useState("76561198080636799");
  const [stack, setStack] = useState(true);

  const handleStackDupes = () => (stack ? setStack(false) : setStack(true));

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);

  const handleSearch = async () => {
    setInventory(await getInventoryNode({steamId: id}));
  };

  let uniqueInventoryItems = stack
    ? getInventoryUniqueItems({inventory})
    : inventory;

  if (!inventory) {
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
        onSearch={handleSearch}
        onIdChange={handleIdChange}
      />
      <InventoryFilters filters={filters} setFilter={setFilters} />
      <Button onClick={handleStackDupes}>Unstack dupes</Button>
      <InventoryList items={uniqueInventoryItems} />
    </>
  );
};

// export const getStaticProps = async () => {
//   return {
//     props: { dummyInventory: getInventory() },
//   };
// };

export default SteamInventory;
