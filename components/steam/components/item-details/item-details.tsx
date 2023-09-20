import {InventoryItemType} from "@/types";
import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";

import styles from "./item-details.module.scss";

type Props = {item: InventoryItemType};

export const ItemDetails: FC<Props> = ({item}) => {
  const {icon_url, name, descriptions, tags} = item;

  const exterior = tags.find(
    (tag) => tag.category === "Exterior"
  )?.localized_tag_name;

  const renderDescriptions = () =>
    descriptions.map((description, i) => {
      return (
        description.value && (
          <div
            key={i}
            style={
              description.color ? {color: `#${description.color}`} : undefined
            }
          >
            {description.value}
          </div>
        )
      );
    });

  return (
    <div className={styles.details}>
      <h1 className={styles.name}>{name}</h1>
      {exterior && <h2 className={styles.exterior}>{`(${exterior})`}</h2>}
      <Image
        src={`${inventoryImageBaseUrl}${icon_url}`}
        alt={name}
        width={256}
        priority
        quality={100}
        height={198}
      />
      <hr className={styles.line} />

      {renderDescriptions()}
    </div>
  );
};
