import {FC} from "react";
import styles from "./inventory-list.module.scss";
import {InventoryItem} from "../inventory-item/inventory-item";
import {SortedInventoryItemType, ReadableInventoryType} from "../../types";

type Props = {
  items: ReadableInventoryType;
};

export const InventoryList: FC<Props> = ({items}) => {
  const {inventory} = items;

  return (
    <>
      <h2 className={styles.title}>{`Items: ${inventory.length}`}</h2>
      <div className={styles.container}>
        <ul className={styles.items}>
          {inventory.map((item: SortedInventoryItemType, index) => (
            <InventoryItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
