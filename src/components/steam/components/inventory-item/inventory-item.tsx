import {InventoryItemType} from '@/src/services/steam-inventory';
import {inventoryImageBaseUrl} from '../../constants';
import {addQueryParam} from '@/src/services/helpers';
import {getAvailablePrice} from '../../helpers';
import {STAT_TRAK_PATTERN} from './constants';
import {ItemOpened} from './components';
import {NextRouter} from 'next/router';
import {motion} from 'framer-motion';
import React, {FC} from 'react';

import styles from './inventory-item.module.scss';

type Props = {item: InventoryItemType; isSelected: boolean; router: NextRouter};

export const InventoryItem: FC<Props> = ({item, isSelected, router}) => {
  const {name_color, rarity_color, name, icon_url, count = 1, prices, assetid, price, isEmpty} = item;
  if (!icon_url && !isEmpty) {
    return null;
  }

  const wrapperStyle = {border: `1px solid #${rarity_color}`};
  const availablePrice = price ?? Number(getAvailablePrice(prices));
  const formattedPrice = !isNaN(availablePrice) && availablePrice.toFixed(2);
  const amount = count > 1 ? ` x ${count}` : '';
  const description = name?.match(STAT_TRAK_PATTERN) ? name.replace(STAT_TRAK_PATTERN, '') : name || '';
  const imgSrc = inventoryImageBaseUrl + icon_url;
  const selectItem = () => addQueryParam({router, param: {item: assetid}});

  return (
    <li className={styles.item}>
      {isEmpty ? (
        <div className={styles.empty} />
      ) : (
        <>
          <motion.div layout onClick={selectItem} data-isopen={isSelected} style={wrapperStyle} className={styles.link}>
            <motion.div className={styles.header}>
              <motion.img layout loading="lazy" src={imgSrc} alt={name} width={110} height={82} />
              <motion.p layout style={{color: `#${name_color}`}} className={styles.describe}>
                {description + amount}
              </motion.p>
            </motion.div>
            <ItemOpened isOpened={isSelected} item={item} />
            {formattedPrice && <motion.span layout>{formattedPrice + '$'}</motion.span>}
          </motion.div>
        </>
      )}
    </li>
  );
};
