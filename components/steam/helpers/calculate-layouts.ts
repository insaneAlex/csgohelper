import {InventoryItemType, NumObject} from "@/types";

export const calculateLayouts = (
  items: InventoryItemType[],
  cols: {[P: string]: number}
) => {
  const width: NumObject = {lg: 2, md: 2, sm: 4, xs: 5, xxs: 2};
  const height: NumObject = {lg: 1.3, md: 1.3, sm: 1.3, xs: 1.3, xxs: 1.3};

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
