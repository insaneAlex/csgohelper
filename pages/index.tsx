import {FILTERS_PARAM, PRIVATE_INVENTORY_ERROR, PROFILE_NOT_FOUND, STEAMID_PARAM} from '@/api/constants';
import {filterInventoryByTypes, getInventoryUniqueItems, getParamValues} from '@/src/steam/helpers';
import {Inventory, InventoryFilters, SearchInventory} from '@/src/steam';
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {InventoryItemType} from '@/types';
import {Loader, Checkbox, ErrorAlert} from '@/src/ui';
import {SteamIDType} from '@/api/types';
import {storage} from '@/src/services';
import {connect} from 'react-redux';
import {
  itemsLoadingSelector,
  getInitialItemsStart,
  itemsErrorSelector,
  itemsSelector,
  getItemsStart,
  RootState
} from '@/src/redux';

type Props = {
  onGetInventory: (arg: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  onGetItems: () => void;
  loading: boolean;
  error: any;
};

const SteamInventoryComponent: FC<Props> = ({onGetInventory, onGetItems, inventoryItems, error, loading}) => {
  const steamId = storage.localStorage.get(STEAMID_PARAM);
  const [steamid, setSteamid] = useState(steamId);
  const [stack, setStack] = useState(false);

  useEffect(() => {
    inventoryItems.length === 0 && steamid && onGetItems();
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

  const renderError = () => {
    if (error === PRIVATE_INVENTORY_ERROR) {
      return <ErrorAlert>Inventory is private, change your privacy settings or try another account</ErrorAlert>;
    }
    if (error === PROFILE_NOT_FOUND) {
      return <ErrorAlert>There is not such profile, try another SteamID</ErrorAlert>;
    }
  };

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
      {renderError()}
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
  loading: itemsLoadingSelector(state),
  error: itemsErrorSelector(state)
});

const mapDispatchToProps = {
  onGetItems: getInitialItemsStart,
  onGetInventory: getItemsStart
};

const SteamInventoryContainer = connect(mapStateToProps, mapDispatchToProps);
export default SteamInventoryContainer(SteamInventoryComponent);
