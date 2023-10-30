import {inventoryImageBaseUrl} from '../../constants';
import {ImgSize, InventoryItemType} from '@/types';
import {STAT_TRAK_PATTERN} from './constants';
import {Layout} from 'react-grid-layout';
import {PriceOptions} from '../../types';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react';

import styles from './inventory-item.module.scss';

type Props = {imgSize: ImgSize; item: InventoryItemType & Layout};

export const InventoryItem: FC<Props> = ({item, imgSize}) => {
  const router = useRouter();
  const {name_color, assetid, icon_url, count = 1, prices} = item;
  const {width, height} = imgSize;
  const price = prices?.[PriceOptions.WEEK]?.average * count;
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
    <Link className={styles.item} href={{pathname: `/items/${assetid}`, query: router.query}}>
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
