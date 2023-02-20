import {FC} from "react";
import styles from "./inventory-items.module.scss";
import {InventoryItem} from "./inventory-item";
import {SortedInventoryItemType, SortedInventoryType} from "./types";

type Props = {items: SortedInventoryType; onSearch: () => void};

export const InventoryList: FC<Props> = ({items, onSearch}) => {
  const {total_inventory_count: inventoryAmount, inventory} = items;

  return (
    <>
      <h2 className={styles.title}>{`Total Items: ${inventoryAmount}`}</h2>
      <div className={styles.searchBlock}>
        <form action="">
          <div>
            <label htmlFor="steamId"></label>
            <input
              placeholder="Enter your SteamID64"
              type="text"
              id="steamId"
            />
          </div>
        </form>
        <div className={styles.searchBtn}>
          <button onClick={onSearch}>SEARCH BY SteamID</button>
        </div>
      </div>

      <ul className={styles.items}>
        {inventory.map((item: SortedInventoryItemType, index) => (
          <InventoryItem key={index} item={item} />
        ))}
      </ul>
    </>
  );
};
