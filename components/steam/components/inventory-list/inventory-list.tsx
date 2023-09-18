import {FC} from "react";
import {InventoryItemType} from "@/types";
import {ResponsiveInventoryList} from "./responsive-inventory-list";

import styles from "./inventory-list.module.scss";

type Props = {items: InventoryItemType[]};

export const InventoryList: FC<Props> = ({items}) => (
  <>
    <h2 className={styles.title}>{`Items: ${items.length}`}</h2>
    <ResponsiveInventoryList items={items} />
  </>
);
