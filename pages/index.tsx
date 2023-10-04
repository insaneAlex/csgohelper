import {Inventory, InventoryFilters, SearchInventory} from '@/src/steam';
import {filterInventoryByTypes, getInventoryUniqueItems} from '@/src/steam/helpers';
import {Loader, Checkbox} from '@/src/ui';
import {ChangeEvent, FC, useEffect, useMemo, useState} from 'react';
import {getInitialInventory, getInventoryNode} from '@/api';
import {InventoryItemType, ItemType} from '@/types';
import {useSearchParams} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {InventoryState, getItemsSuccess} from '@/src/redux/features/inventory-slice';

type Props = {initialInventory: InventoryItemType[]};

const SteamInventory: FC<Props> = () => {
  const searchParams = useSearchParams();
  const itemz = useSelector((state: {inventory: InventoryState}) => state.inventory.items) || [];
  const [inventory, setInventory] = useState<InventoryItemType[]>(itemz);

  const [id, setId] = useState('76561198080636799');
  const [stack, setStack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filters = useMemo(() => (searchParams.get('filters')?.split('_') || []) as ItemType[], [searchParams]);
  const hasFilters = filters.length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialInventory = async () => {
      const {inventory} = await getInitialInventory();
      setInventory(inventory);
      dispatch(getItemsSuccess(inventory));
    };

    inventory.length === 0 &&
      fetchInitialInventory()
        .catch((e) => {
          console.log(new Error(e));
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [inventory.length, dispatch]);

  const handleStackDupes = () => setStack((prev) => !prev);
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const handleSearch = async () => {
    const resp = await getInventoryNode({steamId: id});
    setInventory(resp?.inventory);
    dispatch(getItemsSuccess(resp?.inventory));
  };

  let items = stack ? getInventoryUniqueItems({inventory}) : inventory;

  if (hasFilters) {
    items = filterInventoryByTypes({
      inventory: items,
      types: filters
    });
  }

  const renderContent = () => {
    const uniqueItemsLength = items.length;

    if (isLoading) {
      return <Loader />;
    }

    if (uniqueItemsLength === 0 && hasFilters) {
      return <p style={{textAlign: 'center', marginTop: '50px'}}>No items with such filters</p>;
    }

    if (uniqueItemsLength > 0) {
      return <Inventory items={items} />;
    }
  };

  return (
    <>
      <SearchInventory id={id} onSearch={handleSearch} onIdChange={handleIdChange} />
      <InventoryFilters />
      <div style={{maxWidth: '160px'}}>
        <Checkbox onChange={handleStackDupes} checked={stack} name="STACK DUPES" label="STACK DUPES" />
      </div>
      {renderContent()}
    </>
  );
};

export default SteamInventory;
