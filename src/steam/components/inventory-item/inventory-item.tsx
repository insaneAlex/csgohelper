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
  const {name_color, assetid, icon_url, count} = item;

  if (!icon_url) {
    return null;
  }

  const imgSrc = `${inventoryImageBaseUrl}${icon_url}`;
  const amount = count && count > 1 ? ` x ${count}` : '';

  let {name} = item;
  if (name?.match(STAT_TRAK_PATTERN)) {
    name = name.replace(STAT_TRAK_PATTERN, '');
  }

  return (
    <Link className={styles.item} href={`/items/${assetid}`}>
      <Image src={imgSrc} priority alt={name} width={imgSize.width} height={imgSize.height} />
      {name && (
        <p style={{color: `#${name_color}`}} className={styles.describe}>
          {name + amount}
        </p>
      )}
    </Link>
  );
};
