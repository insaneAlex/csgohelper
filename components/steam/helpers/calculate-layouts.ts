import {InventoryItemType, NumObject} from "@/types";

export const calculateLayouts = (
  items: InventoryItemType[],
  cols: {[P: string]: number}
) => {
  const width: NumObject = {lg: 2, md: 2, sm: 4, xs: 5, xxs: 2};
  const height: NumObject = {lg: 2, md: 1.7, sm: 1.7, xs: 1.5, xxs: 2};

  return Object.keys(cols).reduce((layouts, breakpoint) => {
    layouts[breakpoint] = items.map((item, i) => ({
      i: i.toString(),
      x: (i * width[breakpoint]) % cols[breakpoint],
      y: Math.floor(i / 6) * height[breakpoint],
      w: width[breakpoint],
      h: height[breakpoint],
      ...item,
    }));
    return layouts;
  }, {} as {[P: string]: any[]});
};
