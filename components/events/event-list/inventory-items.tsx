import {FC} from "react";
import styles from "./inventory-items.module.scss";
import {InventoryItem} from "./inventory-item";
import {DescriptionType, InventoryType} from "@/data/dummy-inventory";

type Props = {inventory: InventoryType};

export const InventoryList: FC<Props> = ({inventory}) => {
  if (!inventory) {
    return <p>Nothing to show</p>;
  }

  const sortedInventory = inventory.descriptions.filter(
    (item) => item.tags[0].internal_name === "CSGO_Type_WeaponCase"
  );

  return (
    <>
      <h2>{`Total Items: ${inventory.total_inventory_count}`}</h2>
      <ul className={styles.items}>
        {sortedInventory.map((item: DescriptionType, index) => (
          <InventoryItem key={index} item={item} />
        ))}
      </ul>
    </>
  );
};
