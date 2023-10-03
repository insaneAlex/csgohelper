import React, {FC, useMemo} from 'react';
import {WidthProvider, Responsive} from 'react-grid-layout';
import {InventoryItem} from '../inventory-item';
import {InventoryItemType} from '@/types';
import {calculateLayouts, getImgSizes, getScreenSize, getItemRarityColor} from '../../helpers';
import {useWindowWidth} from '@/src/hooks';
import {GridConfigType} from '../types';

import styles from './responsive-inventory-list.module.scss';

type Props = {items: InventoryItemType[]; gridConfig: GridConfigType};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const ResponsiveInventoryList: FC<Props> = ({items, gridConfig}) => {
  const layouts = useMemo(() => calculateLayouts({items, gridConfig}), [items, gridConfig]);
  const screenSize = getScreenSize({width: useWindowWidth()});
  const imgSize = useMemo(() => getImgSizes({screenSize}), [screenSize]);

  return (
    <ResponsiveReactGridLayout
      isResizable={false}
      isDraggable={false}
      isDroppable={false}
      layouts={layouts}
      rowHeight={100}
      cols={gridConfig.col}
    >
      {layouts[screenSize].map((item) => {
        const color = `#${getItemRarityColor({tags: item.tags})}`;
        return (
          <div style={{border: `1px solid ${color}`}} className={styles.item} key={item.i}>
            <InventoryItem item={item} imgSize={imgSize} />
          </div>
        );
      })}
    </ResponsiveReactGridLayout>
  );
};
