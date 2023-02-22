import Image from "next/image";
import {FC} from "react";
import {inventoryImageBaseUrl} from "./constants";
import styles from "./inventory-item.module.scss";
import {SortedInventoryItemType} from "./types";

export const InventoryItem: FC<{item: SortedInventoryItemType}> = ({item}) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={`${inventoryImageBaseUrl}${item.icon_url}`}
          alt={item.name}
          width={150}
          height={115}
        />
      </div>
      <p className={styles.describe}>{item.name}</p>
    </li>
  );
};
