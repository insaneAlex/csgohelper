import {getAppliedFilterParams, filterInventory, SearchInventory, Inventory, Filters} from '@/src/components/steam';
import {inventoryStatusSelector, itemsFiltersSelector, itemsSelector, getItemsStart, RootState} from '@/src/redux';
import {GetInventoryPayloadType, InventoryStatuses} from '@/src/redux/features';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Loader, ErrorAlert} from '@/src/components/ui';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {FC, useEffect} from 'react';
import {StrArrObject} from '@/types';

type Props = {
  onGetItems: (a: GetInventoryPayloadType) => void;
  inventoryItems: InventoryItemType[];
  possibleFilters: StrArrObject;
  status: InventoryStatuses;
};

export const SteamInventory: FC<Props> = ({onGetItems, possibleFilters, inventoryItems, status}) => {
  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const hasNoItems = inventoryItems.length === 0;

  useEffect(() => {
    hasNoItems && steamid && onGetItems({steamid});
  }, []);

  const router = useRouter();
  const isLoading = status === InventoryStatuses.INIT_LOAD;
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
    if (!hasNoItems) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory loading={isLoading} />
      {renderError()}
      <Filters router={router} possibleFilters={possibleFilters} />
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
