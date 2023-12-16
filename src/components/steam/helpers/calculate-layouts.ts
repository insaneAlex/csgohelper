import {InventoryItemType} from '@/src/services/steam-inventory';
import {GridConfigType} from '../types';
import {Layout} from 'react-grid-layout';

type Props = {items: InventoryItemType[]; gridConfig: GridConfigType};

export const calculateLayouts = ({items, gridConfig}: Props) => {
  const {cols, width, height} = gridConfig;
  return Object.keys(cols).reduce(
    (layouts, breakpoint) => {
      layouts[breakpoint] = items.map((item, i) => ({
        i: item.assetid,
        x: (i * width[breakpoint]) % cols[breakpoint],
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
