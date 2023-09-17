import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";
import {InventoryItemType} from "@/types";

import styles from "./inventory-item.module.scss";

type Props = {item: InventoryItemType & {count?: string}};

export const InventoryItem: FC<Props> = ({item}) => {
  const counter =
    item?.count && Number(item?.count) > 1 ? ` x ${item.count}` : "";

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
      <p className={styles.describe}>{item.name + counter}</p>
    </li>
  );
};
