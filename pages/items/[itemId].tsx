import {FC} from 'react';
import {BackIcon, Loader} from '@/src/ui';
import {InventoryItemType} from '@/types';
import Link from 'next/link';
import {ItemDetails} from '@/src/steam';
import {DUMMY_INVENTORY} from '@/dummy/data';
import {useRouter} from 'next/router';

const ItemDetailsPage: FC = () => {
  const items = DUMMY_INVENTORY;
  const router = useRouter();
  const itemId = router?.query?.itemId;

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
