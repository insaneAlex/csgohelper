import {getInventoryUniqueItems, filterInventoryByTypes} from '@/src/components/steam/helpers';
import {Filters, Inventory, SearchInventory} from '@/src/components/steam';
import {Loader, Checkbox, ErrorAlert} from '@/src/components/ui';
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {InventoryItemType} from '@/types';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {
  itemsLoadingSelector,
  getInitialItemsStart,
  itemsErrorSelector,
  InventoryErrorType,
  SteamFetchErrors,
  itemsSelector,
  getItemsStart,
  SteamIDType,
  RootState
} from '@/src/redux';
type Props = {
  onGetInventory: (arg: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  error: InventoryErrorType;
  onGetItems: () => void;
  loading: boolean;
};

const SteamInventory: FC<Props> = ({onGetInventory, onGetItems, inventoryItems, error, loading}) => {
  const router = useRouter();
  const [steamid, setSteamid] = useState(storage.localStorage.get(STEAMID_PARAM));
  const [stack, setStack] = useState(false);

  useEffect(() => {
    inventoryItems.length === 0 && steamid && onGetItems();
  }, []);

  const filters = (typeof router.query.type === 'string' ? [router.query.type] : router.query.type) || [];

  const hasFilters = filters.length > 0;

  const toggleStackDupes = () => setStack(!stack);
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value);
  const handleSearch = () => steamid && onGetInventory({steamid});

  let items = stack ? getInventoryUniqueItems({inventory: inventoryItems}) : inventoryItems;

  if (hasFilters) {
    items = filterInventoryByTypes({inventory: items, types: filters});
  }

  const renderError = () => {
    switch (error) {
      case SteamFetchErrors.PRIVATE_INVENTORY_ERROR:
        return <ErrorAlert>Inventory is private, change your privacy settings or try another account</ErrorAlert>;
      case SteamFetchErrors.PROFILE_NOT_FOUND:
        return <ErrorAlert>There is not such profile, try another SteamID</ErrorAlert>;
      case SteamFetchErrors.TOO_MANY_REQUESTS:
        return <ErrorAlert>Too many requests last time, try later or try to fetch another account</ErrorAlert>;
    }
  };

  const renderContent = () => {
    const itemsLength = items?.length;
    const hasNoItems = itemsLength === 0;

    if (loading && hasNoItems) {
      return <Loader />;
    }

    if (hasNoItems && hasFilters) {
      return <ErrorAlert>No items with such filters</ErrorAlert>;
    }

    if (itemsLength > 0) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory id={steamid} disabled={loading} onSearch={handleSearch} onIdChange={handleIdChange} />
      {renderError()}
      <Filters />
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

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventory);
