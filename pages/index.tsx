import {inventoryStatusSelector, itemsSelector, getItemsStart, RootState} from '@/src/redux';
import {GetInventoryPayloadType, InventoryStatuses} from '@/src/redux/features';
import {SearchInventory, InventoryLayout} from '@/src/components/steam';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {ErrorAlert} from '@/src/components/ui';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {FC, useEffect} from 'react';

type Props = {
  onGetItems: (a: GetInventoryPayloadType) => void;
  inventoryItems: InventoryItemType[];
  status: InventoryStatuses;
};

export const SteamInventory: FC<Props> = ({onGetItems, inventoryItems, status}) => {
  const router = useRouter();
  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const hasNoItems = inventoryItems.length === 0;

  useEffect(() => {
    hasNoItems && steamid && onGetItems({steamid});
  }, []);

  const renderError = () => {
    switch (status) {
      case InventoryStatuses.PRIVATE_INVENTORY:
        return <ErrorAlert>Inventory is private, change your privacy settings or try another account</ErrorAlert>;
      case InventoryStatuses.NO_PROFILE:
        return <ErrorAlert>There is not such profile, try another SteamID</ErrorAlert>;
    }
  };

  return (
    <>
      <SearchInventory inventoryStatus={status} />
      {renderError()}
      <InventoryLayout router={router} items={inventoryItems} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  status: inventoryStatusSelector(state),
  inventoryItems: itemsSelector(state)
});
const mapDispatchToProps = {onGetItems: getItemsStart};

export const SteamInventoryContainer = connect(mapStateToProps, mapDispatchToProps);
export default SteamInventoryContainer(SteamInventory);
