import {FC} from "react";
import {InventoryItem} from "../inventory-item/inventory-item";

import styles from "./inventory-list.module.scss";
import {InventoryItemType} from "@/data/dummy-inventory";

type Props = {items: InventoryItemType[]};

export const InventoryList: FC<Props> = ({items}) => (
  <>
    <h2 className={styles.title}>{`Items: ${items.length}`}</h2>
    <ul className={styles.items}>
      {items.map((item: InventoryItemType, index) => (
        <InventoryItem key={index} item={item} />
      ))}
    </ul>
  </>
);
