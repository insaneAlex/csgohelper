import {FC} from 'react';
import Image from 'next/image';
import {inventoryImageBaseUrl} from '@/api/constants';
import {ImgSize, InventoryItemType} from '@/types';
import {Layout} from 'react-grid-layout';
import Link from 'next/link';
import {STAT_TRAK_PATTERN} from './constants';

import styles from './inventory-item.module.scss';

type Props = {imgSize: ImgSize; item: InventoryItemType & Layout & {count?: number}};

export const InventoryItem: FC<Props> = ({item, imgSize}) => {
  const {name_color, assetid, icon_url, count, prices} = item;
  const {width, height} = imgSize;

  const price = prices?.['7_days']?.average * (count || 1);
  const formattedPrice = !isNaN(price) && price.toFixed(2);

  if (!icon_url) {
    return null;
  }
  let name = item.name;
  const imgSrc = `${inventoryImageBaseUrl}${icon_url}`;
  const amount = count && count > 1 ? ` x ${count}` : '';

  if (name?.match(STAT_TRAK_PATTERN)) {
    name = name.replace(STAT_TRAK_PATTERN, '');
  }

  return (
    <Link className={styles.item} href={`/items/${assetid}`}>
      <Image src={imgSrc} priority alt={name} width={width} height={height} />
      {name && (
        <p style={{color: `#${name_color}`}} className={styles.describe}>
          {name + amount}
        </p>
      )}
      {formattedPrice && !isNaN(price) && <span className={styles.price}>{`${formattedPrice}$`}</span>}
    </Link>
  );
};