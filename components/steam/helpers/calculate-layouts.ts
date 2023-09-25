import {InventoryItemType, NumObject} from "@/types";

export const calculateLayouts = (
  items: InventoryItemType[],
  cols: {[P: string]: number}
) => {
  const width: NumObject = {lg: 2, md: 2, sm: 4, xs: 4, xxs: 4};
  const height: NumObject = {lg: 1.5, md: 1.5, sm: 1.5, xs: 1, xxs: 1};

  return Object.keys(cols).reduce((layouts, breakpoint) => {
    layouts[breakpoint] = items.map((item, i) => ({
      i: item.assetid,
      x: (i * width[breakpoint]) % cols[breakpoint],
      y: Math.floor(i / 6) * height[breakpoint],
      w: width[breakpoint],
      h: height[breakpoint],
      ...item,
    }));
    return layouts;
  }, {} as {[P: string]: any[]});
};
