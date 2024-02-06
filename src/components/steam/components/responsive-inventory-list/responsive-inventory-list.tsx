import {InventoryItemType} from '@/src/services/steam-inventory';
import {addQueryParam} from '@/src/services/helpers';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {InventoryItem} from '../inventory-item';
import {Portal} from '@/src/components/ui';
import {useSelector} from 'react-redux';
import {NextRouter} from 'next/router';
import React, {FC} from 'react';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; router: NextRouter};

export const ResponsiveInventoryList: FC<Props> = ({items, router}) => {
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const unselectItem = () => addQueryParam({router, param: {item: []}});

  return (
    <section className={styles.wrapper}>
      {updateTime && <p className={styles.updateTime}>inventory cached, last update - {updateTime}</p>}
      <ul className={styles.list}>
        {items.map((item) => {
          const isSelected = router.query.item === item.assetid;
          return (
            <React.Fragment key={item.assetid}>
              {isSelected && <Portal.Overlay onClick={unselectItem} visible />}
              <InventoryItem item={item} router={router} isSelected={isSelected} />
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};
