import {calculateLayouts, getImgSizes, getScreenSize} from '../../helpers';
import {WidthProvider, Responsive} from 'react-grid-layout';
import {InventoryItem} from '../inventory-item';
import {useWindowWidth} from '@/src/hooks';
import {GridConfigType} from '../../types';
import {InventoryItemType} from '@/types';
import React, {FC, useMemo} from 'react';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; gridConfig: GridConfigType};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const ResponsiveInventoryList: FC<Props> = ({items, gridConfig}) => {
  const layouts = useMemo(() => calculateLayouts({items, gridConfig}), [items, gridConfig]);
  const screenSize = getScreenSize({width: useWindowWidth()});
  const imgSize = useMemo(() => getImgSizes({screenSize}), [screenSize]);

  return (
    <ResponsiveReactGridLayout
      cols={gridConfig.col}
      isResizable={false}
      isDraggable={false}
      isDroppable={false}
      layouts={layouts}
      rowHeight={100}
    >
      {layouts[screenSize].map((item) => (
        <div style={{border: `1px solid #${item.rarity_color}`}} className={styles.item} key={item.i}>
          <InventoryItem item={item} imgSize={imgSize} />
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
};
