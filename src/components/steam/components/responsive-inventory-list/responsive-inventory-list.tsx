import {calculateLayouts, getImgSizes, getScreenSize} from '../../helpers';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {WidthProvider, Responsive} from 'react-grid-layout';
import {itemsUpdateTimeSelector} from '@/src/redux';
import {InventoryItem} from '../inventory-item';
import {useWindowWidth} from '@/src/hooks';
import {GridConfigType} from '../../types';
import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {NextRouter} from 'next/router';
import classNames from 'classnames';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; gridConfig: GridConfigType; router: NextRouter};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const ResponsiveInventoryList: FC<Props> = ({items, gridConfig, router}) => {
  const width = useWindowWidth();
  const layouts = useMemo(() => calculateLayouts({items, gridConfig}), [items]);
  const screenSize = useMemo(() => getScreenSize({width}), [width]);
  const imgSize = useMemo(() => getImgSizes({screenSize}), [screenSize]);
  const updateTime = useSelector(itemsUpdateTimeSelector);

  return (
    <div className={styles.container}>
      {updateTime && <p className={styles.updateTime}>inventory cached, last update - {updateTime}</p>}
      <ResponsiveReactGridLayout
        cols={gridConfig.cols}
        isResizable={false}
        isDraggable={false}
        isDroppable={false}
        layouts={layouts}
        rowHeight={100}
      >
        {layouts[screenSize].map((item) => (
          <div
            style={{border: `1px solid #${item.rarity_color}`}}
            className={classNames(styles.item, {[styles.empty]: item.isEmpty})}
            key={item.i}
          >
            <InventoryItem item={item} imgSize={imgSize} router={router} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};
