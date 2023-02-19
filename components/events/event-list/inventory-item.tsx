import {DescriptionType} from "@/data/dummy-inventory";
import Image from "next/image";
import {FC} from "react";
import styles from "./inventory-item.module.scss";

export const InventoryItem: FC<{item: DescriptionType}> = ({item}) => {
  const imageBaseUrl = "https://steamcommunity-a.akamaihd.net/economy/image/";

  return (
    <li key={item.icon_url} className={styles.wrapper}>
      <div>
        <Image
          src={`${imageBaseUrl}${item.icon_url}`}
          alt={item.market_name}
          width={150}
          height={115}
        />
      </div>
      <p className={styles.describe}>{item.market_name}</p>
    </li>
  );
};
