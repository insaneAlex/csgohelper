import {filterInventoryByTypes, getInventoryUniqueItems, getParamValues} from '@/src/components/steam/helpers';
import {FILTERS_PARAM, Inventory, InventoryFilters, SearchInventory} from '@/src/components/steam';
import {ChangeEvent, FC, useEffect, useState} from 'react';
import {Loader, Checkbox, ErrorAlert} from '@/src/components/ui';
import {useSearchParams} from 'next/navigation';
import {InventoryItemType} from '@/types';
import {storage} from '@/src/services';
import {STEAMID_PARAM} from '@/core';
import {connect} from 'react-redux';
import {
  itemsLoadingSelector,
  getInitialItemsStart,
  itemsErrorSelector,
  SteamFetchErrors,
  itemsSelector,
  getItemsStart,
  SteamIDType,
  RootState
} from '@/src/redux';
import Head from 'next/head';

type Props = {
  onGetInventory: (arg: SteamIDType) => void;
  inventoryItems: InventoryItemType[];
  onGetItems: () => void;
  loading: boolean;
  error: any;
};

const SteamInventoryComponent: FC<Props> = ({onGetInventory, onGetItems, inventoryItems, error, loading}) => {
  const steamId = storage.localStorage.get(STEAMID_PARAM);
  const [steamid, setSteamid] = useState(steamId || '76561198080636799');
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
      <Head>
        <title>CS2.Helper - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="google-adsense-account" content="ca-pub-7972775133662836" />;
      </Head>
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
