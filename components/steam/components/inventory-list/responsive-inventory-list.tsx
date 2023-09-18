import React, {FC} from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import {InventoryItem} from "../inventory-item";
import {InventoryItemType, TagsType} from "@/types";

import styles from "./inventory-list.module.scss";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

type Props = {
  items: InventoryItemType[];
  className?: string;
  rowHeight?: number;
  cols?: {[P: string]: number} | undefined;
};

const calculateLayouts = (
  items: InventoryItemType[],
  cols: {[P: string]: number}
) => {
  return Object.keys(cols).reduce((layouts, breakpoint) => {
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
};

export const ResponsiveInventoryList: FC<Props> = ({
  items,
  className = "layout",
  rowHeight = 100,
  cols = {lg: 14, md: 10, sm: 8, xs: 4, xxs: 4},
}) => {
  const layouts = calculateLayouts(items, cols);

  return (
    <ResponsiveReactGridLayout
      isResizable={false}
      isDraggable={false}
      className={className}
      cols={cols}
      rowHeight={rowHeight}
      layouts={layouts}
    >
      {layouts.lg.map((item) => {
        const color = item?.tags?.find(
          (item: {[x: string]: string}) => item[TagsType.CATEGORY] === "Rarity"
        )?.color;

        return (
          <div
            style={{border: `1px solid #${color}`}}
            className={styles.item}
            key={item.i}
          >
            <InventoryItem item={item} count={item.i} />
          </div>
        );
      })}
    </ResponsiveReactGridLayout>
  );
};
