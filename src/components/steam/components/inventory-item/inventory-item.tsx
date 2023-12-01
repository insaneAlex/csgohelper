import {InventoryItemType} from '@/src/services/steam-inventory';
import {inventoryImageBaseUrl} from '../../constants';
import {getAvailablePrice} from '../../helpers';
import {STAT_TRAK_PATTERN} from './constants';
import {Layout} from 'react-grid-layout';
import {NextRouter} from 'next/router';
import {ImgSize} from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react';

import styles from './inventory-item.module.scss';

type Props = {imgSize: ImgSize; item: InventoryItemType & Layout; router: NextRouter};

export const InventoryItem: FC<Props> = ({item, imgSize, router}) => {
  const {name_color, assetid, icon_url, count = 1, prices} = item;
  const {width, height} = imgSize;

  const price = Number(getAvailablePrice(prices)) * count;
  const formattedPrice = !isNaN(price) && price.toFixed(2);

  if (!icon_url) {
    return null;
  }

  const imgSrc = `${inventoryImageBaseUrl}${icon_url}`;
  const amount = count && count > 1 ? ` x ${count}` : '';
  const name = item.name?.match(STAT_TRAK_PATTERN) ? item.name.replace(STAT_TRAK_PATTERN, '') : item.name;

  return (
    <Link className={styles.item} href={{pathname: `/items/${assetid}`, query: router.query}} scroll={false}>
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
