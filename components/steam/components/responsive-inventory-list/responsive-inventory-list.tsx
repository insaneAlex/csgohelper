import React, {FC} from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import {InventoryItem} from "../inventory-item";
import {InventoryItemType, TagsType} from "@/types";
import {calculateLayouts} from "../../helpers";

import styles from "./responsive-inventory-list.module.scss";

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
  cols = {lg: 14, md: 12, sm: 20, xs: 15, xxs: 4},
}) => {
  const layouts = calculateLayouts(items, cols);

  return (
    <>
      <h2 className={styles.title}>{`Items: ${items.length}`}</h2>
      <ResponsiveReactGridLayout
        isResizable={false}
        isDraggable={false}
        className={className}
        rowHeight={rowHeight}
        layouts={layouts}
        cols={cols}
      >
        {layouts.lg.map((item, i) => {
          const color = item?.tags?.find(
            (item: {[x: string]: string}) =>
              item[TagsType.CATEGORY] === "Rarity"
          )?.color;

          // TODO: Remove this after pagination
          if (i > 48) return;
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
    </>
  );
};
