import {filterInventoryByTypes, getInventoryUniqueItems, getParamValues} from '@/src/steam/helpers';
import {getItemsSuccess, itemsSelector, AppDispath, RootState} from '@/src/redux';
import {Inventory, InventoryFilters, SearchInventory} from '@/src/steam';
import {getInitialInventory, getInventoryNode} from '@/api';
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {InventoryItemType} from '@/types';
import {useSearchParams} from 'next/navigation';
import {Loader, Checkbox} from '@/src/ui';
import {connect} from 'react-redux';

type Props = {inventoryItems: InventoryItemType[]; setInventoryItems: (inv: InventoryItemType[]) => void};

const SteamInventoryComponent: FC<Props> = ({setInventoryItems, inventoryItems}) => {
  const [inventory, setInventory] = useState<InventoryItemType[]>(inventoryItems);
  const [id, setId] = useState('76561198080636799');
  const [stack, setStack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filters = getParamValues(useSearchParams(), 'filters');
  const hasFilters = filters.length > 0;
  const inventoryLength = inventory.length;

  const handleUpdateInventory = (inventory: InventoryItemType[]) => {
    setInventory(inventory);
    setInventoryItems(inventory);
  };

  const fetchInitialInventory = async () => {
    setIsLoading(true);
    const {inventory} = await getInitialInventory();
    handleUpdateInventory(inventory);
    setIsLoading(false);
  };

  useEffect(() => {
    inventoryLength === 0 && fetchInitialInventory();
  }, [inventoryLength]);

  const toggleStackDupes = () => setStack(!stack);
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const handleSearch = async () => {
    const {inventory} = await getInventoryNode({steamId: id});
    handleUpdateInventory(inventory);
  };

  let items = stack ? getInventoryUniqueItems({inventory}) : inventory;

  if (hasFilters) {
    items = filterInventoryByTypes({inventory: items, types: filters});
  }

  const renderContent = () => {
    const itemsLength = items.length;

    if (isLoading) {
      return <Loader />;
    }

    if (itemsLength === 0 && hasFilters) {
      return <p style={{textAlign: 'center', marginTop: '50px'}}>No items with such filters</p>;
    }

    if (itemsLength > 0) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory id={id} onSearch={handleSearch} onIdChange={handleIdChange} />
      <InventoryFilters />
      <div style={{maxWidth: '160px'}}>
        <Checkbox onChange={toggleStackDupes} checked={stack} name="STACK DUPES" label="STACK DUPES" />
      </div>
      {renderContent()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({inventoryItems: itemsSelector(state)});
const mapDispatchToProps = (dispatch: AppDispath) => ({
  setInventoryItems: (inventory: InventoryItemType[]) => dispatch(getItemsSuccess(inventory))
});

const SteamInventoryContainer = connect(mapStateToProps, mapDispatchToProps);
export default SteamInventoryContainer(SteamInventoryComponent);
