import {InventoryItemType} from '@/src/services/steam-inventory';
import {addQueryParam} from '@/src/services/helpers';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {InventoryItem} from '../inventory-item';
import {useSelector} from 'react-redux';
import {NextRouter} from 'next/router';
import React, {FC} from 'react';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; router: NextRouter};

export const ResponsiveInventoryList: FC<Props> = ({items, router}) => {
  const updateTime = useSelector(itemsUpdateTimeSelector);
  const unselectItem = () => addQueryParam({router, param: {item: []}});

  // TODO: FIX:
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  const Overlay: FC = () => <div onClick={unselectItem} className={styles.overlay} />;

  return (
    <section className={styles.wrapper}>
      {updateTime && <p className={styles.updateTime}>inventory cached, last update - {updateTime}</p>}
      <ul className={styles.list}>
        {items.map((item) => {
          const isSelected = router.query.item === item.assetid;
          return (
            <React.Fragment key={item.assetid}>
              {isSelected && <Overlay />}
              <InventoryItem item={item} router={router} isSelected={isSelected} />
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};
