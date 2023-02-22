import {FC, useRef} from "react";
import styles from "./inventory-items.module.scss";
import {InventoryItem} from "./inventory-item";
import {SortedInventoryItemType, SortedInventoryType} from "./types";

type Props = {
  items: SortedInventoryType;
  onSearch: ({steamId}: {steamId?: string}) => void;
};

export const InventoryList: FC<Props> = ({items, onSearch}) => {
  const {inventory} = items;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    onSearch({steamId: inputRef?.current?.value});
  };

  return (
    <>
      <div className={styles.searchBlock}>
        <form autoComplete="on" action="">
          <div>
            <label htmlFor="steamId"></label>
            <input
              defaultValue="76561198080636799"
              ref={inputRef}
              className={styles.input}
              placeholder="Enter your SteamID"
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
        <h2 className={styles.title}>{`Total Items: ${inventory.length}`}</h2>
        <ul className={styles.items}>
          {inventory.map((item: SortedInventoryItemType, index) => (
            <InventoryItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
