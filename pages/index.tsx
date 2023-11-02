import {Loader, Checkbox, ErrorAlert} from '@/src/components/ui';
import {FC, useEffect, useState} from 'react';
import {InventoryItemType} from '@/types';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {
  getInventoryUniqueItems,
  getAppliedFilterParams,
  filterInventory,
  SearchInventory,
  Inventory,
  Filters
} from '@/src/components/steam';
import {
  itemsLoadingSelector,
  getInitialItemsStart,
  itemsErrorSelector,
  InventoryErrorType,
  SteamFetchErrors,
  itemsSelector,
  SteamIDType,
  RootState,
  itemsFiltersSelector
} from '@/src/redux';

type Props = {
  onGetItems: (a: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  error: InventoryErrorType;
  possibleFilters: {[key: string]: string[]};
  loading: boolean;
};

const SteamInventory: FC<Props> = ({onGetItems, possibleFilters, inventoryItems, error, loading}) => {
  const router = useRouter();
  const [stack, setStack] = useState(false);
  const steamid = storage.localStorage.get(STEAMID_PARAM);

  useEffect(() => {
    inventoryItems.length === 0 && steamid && onGetItems({steamid});
  }, []);

  const validFilters = getAppliedFilterParams(possibleFilters, router.query);
  const hasValidFilters = Object.keys(validFilters).length > 0;

  const toggleStackDupes = () => setStack(!stack);

  let items = stack ? getInventoryUniqueItems({inventory: inventoryItems}) : inventoryItems;

  if (hasValidFilters) {
    items = filterInventory({inventory: items, filters: validFilters});
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
    if (items?.length > 0) {
      return (
        <>
          <div style={{display: 'flex'}}>
            <Checkbox onChange={toggleStackDupes} checked={stack} name="STACK DUPES" label="STACK DUPES" />
          </div>
          <Inventory items={items} />
        </>
      );
    } else {
      if (loading) {
        return <Loader />;
      }
    }
  };

  return (
    <>
      <SearchInventory loading={loading} />
      {renderError()}
      <Filters />
      {renderContent()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  inventoryItems: itemsSelector(state),
  loading: itemsLoadingSelector(state),
  error: itemsErrorSelector(state),
  possibleFilters: itemsFiltersSelector(state)
});

const mapDispatchToProps = {onGetItems: getInitialItemsStart};

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventory);
