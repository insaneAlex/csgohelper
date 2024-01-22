import {InventoryItemType} from '@/src/services/steam-inventory';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {InventoryItem} from '../inventory-item';
import {useSelector} from 'react-redux';
import React, {FC} from 'react';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]};

export const ResponsiveInventoryList: FC<Props> = ({items}) => {
  const updateTime = useSelector(itemsUpdateTimeSelector);
  return (
    <section className={styles.wrapper}>
      {updateTime && <p className={styles.updateTime}>inventory cached, last update - {updateTime}</p>}
      <div className={styles.list}>
        {items.map((item) => (
          <InventoryItem key={item.assetid} item={item} imgSize={{width: 110, height: 82}} />
        ))}
      </div>
    </section>
  );
};
