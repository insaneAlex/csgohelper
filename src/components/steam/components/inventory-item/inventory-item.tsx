import {InventoryItemType} from '@/src/services/steam-inventory';
import {inventoryImageBaseUrl} from '../../constants';
import {getAvailablePrice} from '../../helpers';
import {STAT_TRAK_PATTERN} from './constants';
import {ImgSize} from '@/types';
import Image from 'next/image';
import {FC} from 'react';

import styles from './inventory-item.module.scss';

type Props = {imgSize: ImgSize; item: InventoryItemType};

export const InventoryItem: FC<Props> = ({item, imgSize}) => {
  const {name_color, rarity_color, name, icon_url, count = 1, prices, price} = item;
  const {width, height} = imgSize;

  const availablePrice = price ?? Number(getAvailablePrice(prices));
  const formattedPrice = !isNaN(availablePrice) && availablePrice.toFixed(2);

  if (!icon_url) {
    return null;
  }

  const imgSrc = `${inventoryImageBaseUrl}${icon_url}`;
  const amount = count && count > 1 ? ` x ${count}` : '';
  const description = name?.match(STAT_TRAK_PATTERN) ? name.replace(STAT_TRAK_PATTERN, '') : name;

  return (
    <div className={styles.item}>
      <div className={styles.link} style={{border: `1px solid #${rarity_color}`}}>
        <Image src={imgSrc} priority alt={name} width={width} height={height} quality={50} />
        {description && (
          <p style={{color: `#${name_color}`}} className={styles.describe}>
            {description + amount}
          </p>
        )}
        {formattedPrice && !isNaN(availablePrice) && <span className={styles.price}>{`${formattedPrice}$`}</span>}
      </div>
    </div>
  );
};
