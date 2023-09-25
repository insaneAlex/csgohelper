import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";
import {ImgSize, InventoryItemType} from "@/types";
import {Layout} from "react-grid-layout";
import Link from "next/link";

import styles from "./inventory-item.module.scss";

type Props = {
  imgSize: ImgSize;
  item: InventoryItemType & Layout & {count?: number};
};

export const InventoryItem: FC<Props> = ({item, imgSize}) => {
  const {name, name_color, assetid, icon_url, count} = item;
  const imgSrc = `${inventoryImageBaseUrl}${icon_url}`;
  const amount = count && count > 1 ? ` x ${count}` : "";

  return (
    <Link href={`/items/${assetid}`}>
      <li className={styles.item}>
        <Image
          src={imgSrc}
          priority
          alt={name}
          width={imgSize.width}
          height={imgSize.height}
        />
        <p
          style={{color: `#${name_color}`, textAlign: "center"}}
          className={styles.describe}
        >
          {name + amount}
        </p>
      </li>
    </Link>
  );
};
