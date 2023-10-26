import {FC, useEffect} from 'react';
import {BackIcon, ErrorAlert, Loader} from '@/src/components/ui';
import {InventoryItemType} from '@/types';
import Link from 'next/link';
import {ItemDetails} from '@/src/components/steam';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {getInitialItemsStart, itemsSelector} from '@/src/redux';

const ItemDetailsPage: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const itemId = router.query.itemId;
  const items = useSelector(itemsSelector);
  const item = items?.find((item) => item?.assetid === itemId);

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
        <BackIcon height={32} width={32} />
      </Link>

      <ItemDetails item={item as unknown as InventoryItemType} />
    </>
  );
};

export default ItemDetailsPage;
