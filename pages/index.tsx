import {
  calculateInventoryPrice,
  getAppliedFilterParams,
  SteamProfileTile,
  SearchInventory,
  InventoryLayout,
  modifyInventory,
  Inventory,
  Filters
} from '@/src/components/steam';
import {inventoryStatusSelector, itemsFiltersSelector, itemsSelector, getItemsStart, RootState} from '@/src/redux';
import {GetInventoryPayloadType, InventoryStatuses} from '@/src/redux/features';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {Loader, ErrorAlert} from '@/src/components/ui';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {StrArrObject} from '@/types';
import {connect} from 'react-redux';
import {FC, useEffect} from 'react';

type Props = {
  onGetItems: (a: GetInventoryPayloadType) => void;
  inventoryItems: InventoryItemType[];
  possibleFilters: StrArrObject;
  status: InventoryStatuses;
};

export const SteamInventory: FC<Props> = ({onGetItems, possibleFilters, inventoryItems, status}) => {
  const router = useRouter();
  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const hasNoItems = inventoryItems.length === 0;

  useEffect(() => {
    hasNoItems && steamid && onGetItems({steamid});
  }, []);

  const isLoading = status === InventoryStatuses.INIT_LOAD;
  const filters = getAppliedFilterParams(possibleFilters, router.query);

  const renderError = () => {
    switch (status) {
      case InventoryStatuses.PRIVATE_INVENTORY:
        return <ErrorAlert>Inventory is private, change your privacy settings or try another account</ErrorAlert>;
      case InventoryStatuses.NO_PROFILE:
        return <ErrorAlert>There is not such profile, try another SteamID</ErrorAlert>;
    }
  };

  const modifiedItems = modifyInventory({inventoryItems, filters, query: router.query});
  const renderInventory = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (!hasNoItems) {
      return <Inventory items={modifiedItems} router={router} />;
    }
  };

  return (
    <>
      <SearchInventory loading={isLoading} />
      {renderError()}

      <InventoryLayout>
        <SteamProfileTile
          itemsAmount={modifiedItems.length}
          totalPrice={calculateInventoryPrice({items: modifiedItems})}
        />
        <div style={{flex: 1}}>
          <Filters router={router} possibleFilters={possibleFilters} />
          {renderInventory()}
        </div>
      </InventoryLayout>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  status: inventoryStatusSelector(state),
  inventoryItems: itemsSelector(state),
  possibleFilters: itemsFiltersSelector(state)
});

const mapDispatchToProps = {onGetItems: getItemsStart};

export const SteamInventoryContainer = connect(mapStateToProps, mapDispatchToProps);

export default SteamInventoryContainer(SteamInventory);
