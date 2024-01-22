import {InventoryItemType} from '@/src/services/steam-inventory';
import {inventoryImageBaseUrl} from '../../constants';
import {getAvailablePrice} from '../../helpers';
import {STAT_TRAK_PATTERN} from './constants';
import classNames from 'classnames';
import {ImgSize} from '@/types';
import Image from 'next/image';
import {FC} from 'react';

import styles from './inventory-item.module.scss';

type Props = {imgSize: ImgSize; item: InventoryItemType};

export const InventoryItem: FC<Props> = ({item, imgSize}) => {
  const {name_color, rarity_color, name, icon_url, count = 1, prices, price, isEmpty} = item;

  if (!icon_url && !isEmpty) {
    return null;
  }
  const {width, height} = imgSize;
  const availablePrice = price ?? Number(getAvailablePrice(prices));
  const formattedPrice = !isNaN(availablePrice) && availablePrice.toFixed(2);
  const amount = count > 1 ? ` x ${count}` : '';
  const description = name?.match(STAT_TRAK_PATTERN) ? name.replace(STAT_TRAK_PATTERN, '') : name;
  const imgSrc = inventoryImageBaseUrl + icon_url;
  return (
    <div className={styles.item}>
      <div
        className={classNames(styles.link, {[styles.empty]: isEmpty})}
        style={{border: `1px solid #${rarity_color}`}}
      >
        {!isEmpty && <Image src={imgSrc} priority alt={name} width={width} height={height} quality={50} />}
        {description && (
          <p style={{color: `#${name_color}`}} className={styles.describe}>
            {description + amount}
          </p>
        )}
        {formattedPrice && <span className={styles.price}>{`${formattedPrice}$`}</span>}
      </div>
    </div>
  );
};
