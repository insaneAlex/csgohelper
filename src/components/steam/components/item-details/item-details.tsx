import {InventoryItemType} from '@/src/services/steam-inventory';
import {inventoryImageBaseUrl} from '../../constants';
import {Separator} from '@/src/components/ui';
import Image from 'next/image';
import {FC} from 'react';

import styles from './item-details.module.scss';

export const ItemDetails: FC<{item: InventoryItemType}> = ({item}) => {
  const {icon_url, name, exterior} = item;

  return (
    <section className={styles.details}>
      <h1>{name}</h1>
      {exterior && <h2 className={styles.exterior}>{`(${exterior})`}</h2>}
      <Image src={inventoryImageBaseUrl + icon_url} alt={name} unoptimized width={256} priority height={198} />
      <Separator />
    </section>
  );
};
