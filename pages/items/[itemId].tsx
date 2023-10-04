import {FC} from 'react';
import {BackIcon, Loader} from '@/src/ui';
import {InventoryItemType} from '@/types';
import Link from 'next/link';
import {ItemDetails} from '@/src/steam';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {InventoryState} from '@/src/redux/features/inventory-slice';

const ItemDetailsPage: FC = () => {
  const router = useRouter();
  const itemId = router?.query?.itemId;
  const items = useSelector((state: {inventory: InventoryState}) => state.inventory?.items);

  if (!items) {
    return <Loader />;
  }

  const item = items?.find((item) => item?.assetid === itemId);

  if (item) {
    return (
      <>
        <Link href="/">
          <BackIcon height={32} width={32} />
        </Link>

        <ItemDetails item={item as unknown as InventoryItemType} />
      </>
    );
  }

  return <></>;
};

export default ItemDetailsPage;
