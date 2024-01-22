import {InventoryItemType} from '@/src/services/steam-inventory';
import {InventoryItem} from '../inventory-item';
import React, {FC} from 'react';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]};

export const ResponsiveInventoryList: FC<Props> = ({items}) => (
  <section className={styles.container}>
    {items.map((item) => (
      <InventoryItem key={item.assetid} item={item} imgSize={{width: 110, height: 82}} />
    ))}
  </section>
);
