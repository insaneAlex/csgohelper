import {InventoryItemType} from '@/types';
import {FC} from 'react';
import Image from 'next/image';
import {inventoryImageBaseUrl} from '@/api/constants';

import styles from './item-details.module.scss';

type Props = {item: InventoryItemType};

export const ItemDetails: FC<Props> = ({item}) => {
  const {icon_url, name, exterior} = item;

  return (
    <section className={styles.details}>
      <h1>{name}</h1>
      {exterior && <h2 className={styles.exterior}>{`(${exterior})`}</h2>}
      <Image src={inventoryImageBaseUrl + icon_url} alt={name} unoptimized width={256} priority height={198} />
    </section>
  );
};
