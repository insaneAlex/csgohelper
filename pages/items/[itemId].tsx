import Link from 'next/link';
import {FC, useEffect} from 'react';
import {useRouter} from 'next/router';
import {ItemDetails} from '@/src/components/steam';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorAlert, Icons, Loader} from '@/src/components/ui';
import {getInitialItemsStart, itemsSelector} from '@/src/redux';

const ItemDetailsPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector(itemsSelector);

  const item = items?.find((item) => item?.assetid === router.query.itemId);

  useEffect(() => {
    if (items.length === 0 && !item) {
      dispatch(getInitialItemsStart());
    }
  }, []);

  if (items.length > 0 && !item) {
    return <ErrorAlert>There is no such item in inventory.</ErrorAlert>;
  }

  if (!item) {
    return <Loader />;
  }

  return (
    <>
      <Link href="/">
        <Icons.Back />
      </Link>

      <ItemDetails item={item} />
    </>
  );
};

export default ItemDetailsPage;
