import {InventoryItemType} from "@/types";
import {FC} from "react";
import Image from "next/image";
import {inventoryImageBaseUrl} from "@/api/constants";
import {getTagValue} from "../../helpers/get-tag-value";

import styles from "./item-details.module.scss";

type Props = {item: InventoryItemType};

export const ItemDetails: FC<Props> = ({item}) => {
  const {icon_url, name, descriptions, tags} = item;
  const exterior = getTagValue({tag: "Exterior", tags});
  const imgSrc = `${inventoryImageBaseUrl}${icon_url}`;

  const renderDescriptions = () => (
    <div className={styles.descriptions}>
      {descriptions.map(({value, color}, i) => {
        return (
          value && (
            <div key={i} style={color ? {color: `#${color}`} : undefined}>
              {value}
            </div>
          )
        );
      })}
    </div>
  );
  return (
    <div className={styles.details}>
      <h1>{name}</h1>
      {exterior && <h2 className={styles.exterior}>{`(${exterior})`}</h2>}
      <Image
        src={imgSrc}
        alt={name}
        quality={100}
        width={256}
        priority
        height={198}
      />
      <hr className={styles.line} />

      {renderDescriptions()}
    </div>
  );
};
