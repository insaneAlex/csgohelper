import {InventoryItemType} from "@/types";

export const calculateLayouts = (
  items: InventoryItemType[],
  cols: {[P: string]: number}
) =>
  Object.keys(cols).reduce((layouts, breakpoint) => {
    layouts[breakpoint] = items.map((item, i) => ({
      i: i.toString(),
      x: (i * 2) % cols[breakpoint],
      y: Math.floor(i / 6) * 2,
      w: 2,
      h: 2,
      ...item,
    }));
    return layouts;
  }, {} as {[P: string]: any[]});
