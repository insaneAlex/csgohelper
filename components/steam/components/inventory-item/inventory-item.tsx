import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";
import {InventoryItemType} from "@/types";
import {PRIORITY_ITEMS_COUNT} from "./constants";
import {Layout} from "react-grid-layout";

import styles from "./inventory-item.module.scss";

type Props = {
  count: string;
  item: InventoryItemType & Layout & {count?: string};
};

export const InventoryItem: FC<Props> = ({item, count}) => {
  const counter =
    item?.count && Number(item?.count) > 1 ? ` x ${item.count}` : "";

  return (
    <li className={styles.wrapper}>
      <Image
        src={`${inventoryImageBaseUrl}${item.icon_url}`}
        alt={item.name}
        width={150}
        priority={Number(count) <= PRIORITY_ITEMS_COUNT}
        height={120}
      />
      <p
        style={{color: `#${item.name_color}`, textAlign: "center"}}
        className={styles.describe}
      >
        {item.name + counter}
      </p>
    </li>
  );
};
