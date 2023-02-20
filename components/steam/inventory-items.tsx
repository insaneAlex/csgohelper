import {FC, useRef} from "react";
import styles from "./inventory-items.module.scss";
import {InventoryItem} from "./inventory-item";
import {SortedInventoryItemType, SortedInventoryType} from "./types";

type Props = {
  items: SortedInventoryType;
  onSearch: ({steamId}: {steamId?: string}) => void;
};

export const InventoryList: FC<Props> = ({items, onSearch}) => {
  const {total_inventory_count: inventoryAmount, inventory} = items;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(inputRef);
    onSearch({steamId: inputRef?.current?.value});
  };

  return (
    <>
      <h2 className={styles.title}>{`Total Items: ${inventoryAmount}`}</h2>
      <div className={styles.searchBlock}>
        <form autoComplete="true" action="">
          <div>
            <label htmlFor="steamId"></label>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="Enter your SteamID64"
              type="text"
              id="steamId"
            />
          </div>
        </form>
        <div className={styles.searchBtn}>
          <button onClick={handleClick}>SEARCH BY SteamID</button>
        </div>
      </div>

      <div className={styles.container}>
        <ul className={styles.items}>
          {inventory.map((item: SortedInventoryItemType, index) => (
            <InventoryItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
