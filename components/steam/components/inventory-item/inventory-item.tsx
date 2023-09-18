import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";
import {InventoryItemType, TagsType} from "@/types";

import styles from "./inventory-item.module.scss";

type Props = {item: InventoryItemType & {count?: string}};

export const InventoryItem: FC<Props> = ({item}) => {
  const counter =
    item?.count && Number(item?.count) > 1 ? ` x ${item.count}` : "";

  const color = item.tags.find(
    (item) => item[TagsType.CATEGORY] === "Rarity"
  )?.color;

  return (
    <li style={{border: `1px solid #${color}`}} className={styles.wrapper}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={`${inventoryImageBaseUrl}${item.icon_url}`}
          alt={item.name}
          width={150}
          height={115}
        />
      </div>
      <p style={{color: `#${item.name_color}`}} className={styles.describe}>
        {item.name + counter}
      </p>
    </li>
  );
};
