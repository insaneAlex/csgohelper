import {getAppliedFilterParams, filterInventory, SearchInventory, Inventory, Filters} from '@/src/components/steam';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Loader, ErrorAlert} from '@/src/components/ui';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {FC, useEffect} from 'react';
import {
  inventoryStatusSelector,
  itemsFiltersSelector,
  itemsSelector,
  getItemsStart,
  SteamIDType,
  RootState
} from '@/src/redux';
import {InventoryStatuses} from '@/src/redux/features';

type Props = {
  possibleFilters: Record<string, string[]>;
  onGetItems: (a: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  status: InventoryStatuses;
  loading: boolean;
};

const SteamInventory: FC<Props> = ({onGetItems, possibleFilters, inventoryItems, status}) => {
  const router = useRouter();
  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const isLoading = status === InventoryStatuses.INIT_LOAD;
  const hasNoItems = inventoryItems.length === 0;

  useEffect(() => {
    hasNoItems && steamid && onGetItems({steamid});
  }, []);

  const filters = getAppliedFilterParams(possibleFilters, router.query);
  const shouldFilter = Object.keys(filters).length > 0;
  const items = shouldFilter ? filterInventory({inventory: inventoryItems, filters}) : inventoryItems;

  const renderError = () => {
    switch (status) {
      case InventoryStatuses.PRIVATE_INVENTORY:
        return <ErrorAlert>Inventory is private, change your privacy settings or try another account</ErrorAlert>;
      case InventoryStatuses.NO_PROFILE:
        return <ErrorAlert>There is not such profile, try another SteamID</ErrorAlert>;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (items?.length > 0) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory loading={isLoading} />
      {renderError()}
      <Filters />
      {renderContent()}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  status: inventoryStatusSelector(state),
  inventoryItems: itemsSelector(state),
  possibleFilters: itemsFiltersSelector(state)
});

const mapDispatchToProps = {onGetItems: getItemsStart};

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventory);
