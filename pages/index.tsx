import {getAppliedFilterParams, filterInventory, SearchInventory, Inventory, Filters} from '@/src/components/steam';
import {Loader, ErrorAlert} from '@/src/components/ui';
import {InventoryItemType} from '@/types';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {FC, useEffect} from 'react';
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
  possibleFilters: Record<string, string[]>;
  onGetItems: (a: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  error: InventoryErrorType;
  loading: boolean;
};

const SteamInventory: FC<Props> = ({onGetItems, possibleFilters, inventoryItems, error, loading}) => {
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
      case SteamFetchErrors.TOO_MANY_REQUESTS:
        return <ErrorAlert>Too many requests last time, try later or try to fetch another account</ErrorAlert>;
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (items?.length > 0) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory loading={loading} showNote={hasNoItems} />
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
