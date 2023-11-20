import {getItemsStart, inventoryStatusSelector, itemsSelector} from '@/src/redux';
import {Button, ErrorAlert, Icons, Loader} from '@/src/components/ui';
import {InventoryStatuses} from '@/src/redux/features';
import {useDispatch, useSelector} from 'react-redux';
import {ItemDetails} from '@/src/components/steam';
import {storage} from '@/src/services';
import {useRouter} from 'next/router';
import {STEAMID_PARAM} from '@/core';
import {FC, useEffect} from 'react';
import Link from 'next/link';

const ItemDetailsPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(itemsSelector);
  const status = useSelector(inventoryStatusSelector);

  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const item = items?.find((el) => el?.assetid === router.query.itemId);
  const query = {...router.query, itemId: []};
  const shouldRedirect = !item && !steamid;
  const hasItems = items?.length > 0;

  useEffect(() => {
    !hasItems && steamid && dispatch(getItemsStart({steamid}));

    if (shouldRedirect) {
      router.replace('/', {query});
    }
  }, []);

  if (hasItems && !item) {
    return (
      <>
        <ErrorAlert>There is no such item in inventory.</ErrorAlert>
        <div style={{textAlign: 'center'}}>
          <Link href={{pathname: '/', query}} scroll={false}>
            <Button>Return to Home</Button>
          </Link>
        </div>
      </>
    );
  }

  const renderItem = () => {
    return item ? <ItemDetails item={item} /> : status === InventoryStatuses.INIT_LOAD ? <Loader /> : null;
  };

  return (
    <>
      <Link href={{pathname: '/', query}} scroll={false}>
        <Icons.Back />
      </Link>

      {renderItem()}
    </>
  );
};

export default ItemDetailsPage;
