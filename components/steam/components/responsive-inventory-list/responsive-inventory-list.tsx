import React, {FC, useMemo} from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import {InventoryItem} from "../inventory-item";
import {InventoryItemType, TagsType} from "@/types";
import {calculateLayouts, getImgSizes} from "../../helpers";
import {useWindowWidth} from "./hooks";

import styles from "./responsive-inventory-list.module.scss";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

type Props = {
  items: InventoryItemType[];
  className?: string;
  rowHeight?: number;
  cols?: {[P: string]: number} | undefined;
};

const col = {lg: 14, md: 12, sm: 20, xs: 20, xxs: 16};

export const ResponsiveInventoryList: FC<Props> = ({items, cols = col}) => {
  const layouts = useMemo(() => calculateLayouts(items, cols), [items, cols]);
  const imgSize = getImgSizes({width: useWindowWidth()});

  return (
    <>
      <h2 className={styles.title}>{`Items: ${items.length}`}</h2>
      <ResponsiveReactGridLayout
        isResizable={false}
        isDraggable={false}
        isDroppable={false}
        layouts={layouts}
        rowHeight={100}
        cols={cols}
      >
        {layouts.lg.map((item) => {
          const color = item?.tags?.find(
            (item: {[x: string]: string}) =>
              item[TagsType.CATEGORY] === "Rarity"
          )?.color;
          return (
            <div
              style={{border: `1px solid #${color}`}}
              className={styles.item}
              key={item.i}
            >
              <InventoryItem item={item} imgSize={imgSize} />
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </>
  );
};
