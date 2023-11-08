import {getAppliedFilterParams, filterInventory, SearchInventory, Inventory, Filters} from '@/src/components/steam';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Loader, ErrorAlert} from '@/src/components/ui';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {FC, useEffect} from 'react';
import {
  itemsLoadingSelector,
  getInitialItemsStart,
  itemsFiltersSelector,
  itemsErrorSelector,
  initLoadingSelector,
  InventoryErrorType,
  SteamFetchErrors,
  itemsSelector,
  SteamIDType,
  RootState
} from '@/src/redux';

type Props = {
  possibleFilters: Record<string, string[]>;
  onGetItems: (a: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  error: InventoryErrorType;
  initLoading: boolean;
  loading: boolean;
};

const SteamInventory: FC<Props> = ({onGetItems, initLoading, possibleFilters, inventoryItems, error, loading}) => {
  const router = useRouter();

  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const hasNoItems = inventoryItems.length === 0;

  useEffect(() => {
    hasNoItems && steamid && onGetItems({steamid});
  }, []);

  const validFilters = getAppliedFilterParams(possibleFilters, router.query);
  const hasValidFilters = Object.keys(validFilters).length > 0;

  let items = inventoryItems;

  if (hasValidFilters) {
    items = filterInventory({inventory: items, filters: validFilters});
  }

  const renderError = () => {
    switch (error) {
      case SteamFetchErrors.PRIVATE_INVENTORY_ERROR:
        return <ErrorAlert>Inventory is private, change your privacy settings or try another account</ErrorAlert>;
      case SteamFetchErrors.PROFILE_NOT_FOUND:
        return <ErrorAlert>There is not such profile, try another SteamID</ErrorAlert>;
    }
  };

  const renderContent = () => {
    if (initLoading) {
      return <Loader />;
    }

    if (items?.length > 0) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory disabled={initLoading} loading={loading} />
      {renderError()}
      <Filters />
      {renderContent()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  error: itemsErrorSelector(state),
  inventoryItems: itemsSelector(state),
  loading: itemsLoadingSelector(state),
  initLoading: initLoadingSelector(state),
  possibleFilters: itemsFiltersSelector(state)
});

const mapDispatchToProps = {onGetItems: getInitialItemsStart};

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventory);
