import {InventoryItemType} from '@/types';
import {GridConfigType} from '../types';
import {Layout} from 'react-grid-layout';

type Props = {items: InventoryItemType[]; gridConfig: GridConfigType};

export const calculateLayouts = ({items, gridConfig}: Props) => {
  const {col, width, height} = gridConfig;
  return Object.keys(col).reduce(
    (layouts, breakpoint) => {
      layouts[breakpoint] = items.map((item, i) => ({
        i: item.assetid,
        x: (i * width[breakpoint]) % col[breakpoint],
        y: Math.floor(i / 6) * height[breakpoint],
        w: width[breakpoint],
        h: height[breakpoint],
        ...item
      }));
      return layouts;
    },
    {} as Record<string, (InventoryItemType & Layout)[]>
  );
};
