import React, {FC, useCallback} from "react";
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

export const ResponsiveInventoryList: FC<Props> = ({
  items,
  className = "layout",
  rowHeight = 100,
  cols = {lg: 14, md: 10, sm: 8, xs: 4, xxs: 4},
}) => {
  const getLayouts = useCallback(
    (items: InventoryItemType[], cols: number) =>
      items.map((item, i) => {
        return {
          i: i.toString(),
          x: (i * 2) % cols,
          y: Math.floor(i / 6) * 2,
          w: 2,
          h: 2,
          ...item,
        };
      }),
    []
  );

  const lg = getLayouts(items, cols.lg);
  const md = getLayouts(items, cols.md);
  const sm = getLayouts(items, cols.sm);
  const xs = getLayouts(items, cols.xs);
  const xxs = getLayouts(items, cols.xxs);

  return (
    <ResponsiveReactGridLayout
      isResizable={false}
      isDraggable={false}
      className={className}
      cols={cols}
      rowHeight={rowHeight}
      layouts={{lg, md, sm, xs, xxs}}
    >
      {lg.map((item) => {
        const color = item?.tags.find(
          (item) => item[TagsType.CATEGORY] === "Rarity"
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
