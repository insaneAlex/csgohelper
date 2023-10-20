import {filterInventoryByTypes, getInventoryUniqueItems, getParamValues} from '@/src/steam/helpers';
import {itemsSelector, RootState, getInitialItemsStart, getItemsStart, itemsLoadingSelector} from '@/src/redux';
import {Inventory, InventoryFilters, SearchInventory} from '@/src/steam';
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {InventoryItemType} from '@/types';
import {useSearchParams} from 'next/navigation';
import {Loader, Checkbox} from '@/src/ui';
import {connect} from 'react-redux';
import {storage} from '@/src/services';
import {FILTERS_PARAM, STEAMID_PARAM} from '@/api/constants';

type Props = {
  onGetInventory: (arg: {steamid: string}) => void;
  onGetItems: () => void;
  inventoryItems: InventoryItemType[];
  loading: boolean;
};

const SteamInventoryComponent: FC<Props> = ({onGetInventory, onGetItems, inventoryItems, loading}) => {
  const steamId = storage.localStorage.get(STEAMID_PARAM);
  const [steamid, setSteamid] = useState(steamId);
  const [stack, setStack] = useState(false);

  useEffect(() => {
    inventoryItems.length === 0 && onGetItems();
  }, []);

  const filters = getParamValues(useSearchParams(), FILTERS_PARAM);
  const hasFilters = filters.length > 0;

  const toggleStackDupes = () => setStack(!stack);
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value);
  const handleSearch = () => onGetInventory({steamid});

  let items = stack ? getInventoryUniqueItems({inventory: inventoryItems}) : inventoryItems;

  if (hasFilters) {
    items = filterInventoryByTypes({inventory: items, types: filters});
  }

  const renderContent = () => {
    const itemsLength = items?.length;

    if (loading) {
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
      <SearchInventory id={steamid} disabled={loading} onSearch={handleSearch} onIdChange={handleIdChange} />
      <InventoryFilters />
      <div style={{display: 'flex'}}>
        <Checkbox onChange={toggleStackDupes} checked={stack} name="STACK DUPES" label="STACK DUPES" />
      </div>
      {renderContent()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  inventoryItems: itemsSelector(state),
  loading: itemsLoadingSelector(state)
});

const mapDispatchToProps = {
  onGetItems: getInitialItemsStart,
  onGetInventory: getItemsStart
};

const SteamInventoryContainer = connect(mapStateToProps, mapDispatchToProps);
export default SteamInventoryContainer(SteamInventoryComponent);
