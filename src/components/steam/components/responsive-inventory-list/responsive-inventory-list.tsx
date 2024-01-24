import {InventoryItemType} from '@/src/services/steam-inventory';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {InventoryItem} from '../inventory-item';
import {useSelector} from 'react-redux';
import {NextRouter} from 'next/router';
import React, {FC} from 'react';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; router: NextRouter};

export const ResponsiveInventoryList: FC<Props> = ({items, router}) => {
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const selectedItem = router.query.item;
  return (
    <section className={styles.wrapper}>
      {updateTime && <p className={styles.updateTime}>inventory cached, last update - {updateTime}</p>}
      <div className={styles.list}>
        {items.map((item) => (
          <InventoryItem item={item} router={router} key={item.assetid} isSelected={selectedItem === item.assetid} />
        ))}
      </div>
    </section>
  );
};
