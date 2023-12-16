import {calculateLayouts, getImgSizes, getScreenSize} from '../../helpers';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {WidthProvider, Responsive} from 'react-grid-layout';
import {InventoryItem} from '../inventory-item';
import {useWindowWidth} from '@/src/hooks';
import {GridConfigType} from '../../types';
import React, {FC, useMemo} from 'react';
import classNames from 'classnames';
import {NextRouter} from 'next/router';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; gridConfig: GridConfigType; router: NextRouter};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const ResponsiveInventoryList: FC<Props> = ({items, gridConfig, router}) => {
  const layouts = useMemo(() => calculateLayouts({items, gridConfig}), [items]);
  const screenSize = getScreenSize({width: useWindowWidth()});
  const imgSize = useMemo(() => getImgSizes({screenSize}), [screenSize]);

  return (
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
  );
};
