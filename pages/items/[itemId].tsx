import Link from 'next/link';
import {FC, useEffect} from 'react';
import {STEAMID_PARAM} from '@/core';
import {useRouter} from 'next/router';
import {storage} from '@/src/services';
import {ItemDetails} from '@/src/components/steam';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorAlert, Icons, Loader} from '@/src/components/ui';
import {getInitialItemsStart, itemsSelector} from '@/src/redux';

const ItemDetailsPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(itemsSelector);

  const steamid = storage.localStorage.get(STEAMID_PARAM);
  const item = items?.find((item) => item?.assetid === router.query.itemId);
  const query = {...router.query, itemId: []};
  const shouldRedirect = !item && !steamid;
  const hasItems = items?.length > 0;

  useEffect(() => {
    !hasItems && steamid && dispatch(getInitialItemsStart({steamid}));

    if (shouldRedirect) {
      router.replace('/', {query});
    }
  }, []);

  if (hasItems && !item) {
    return <ErrorAlert>There is no such item in inventory.</ErrorAlert>;
  }

  if (!item) {
    return <Loader />;
  }

  return (
    <>
      <Link href={{pathname: '/', query}}>
        <Icons.Back />
      </Link>

      <ItemDetails item={item} />
    </>
  );
};

export default ItemDetailsPage;
