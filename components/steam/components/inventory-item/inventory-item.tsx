import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";
import {InventoryItemType} from "@/types";
import {Layout} from "react-grid-layout";
import Link from "next/link";

import styles from "./inventory-item.module.scss";

type Props = {
  item: InventoryItemType & Layout & {count?: string};
};

export const InventoryItem: FC<Props> = ({item}) => {
  const {name, name_color, assetid, icon_url, count} = item;
  const counter = count && Number(count) > 1 ? ` x ${count}` : "";

  return (
    <li>
      <Link href={`/items/${assetid}`}>
        <div className={styles.wrapper}>
          <Image
            src={`${inventoryImageBaseUrl}${icon_url}`}
            alt={name}
            width={150}
            quality={100}
            height={120}
          />
          <p
            style={{color: `#${name_color}`, textAlign: "center"}}
            className={styles.describe}
          >
            {name + counter}
          </p>
        </div>
      </Link>
    </li>
  );
};
