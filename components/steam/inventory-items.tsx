import {FC, useRef} from "react";
import styles from "./inventory-items.module.scss";
import {InventoryItem} from "./inventory-item";
import {
  InventoryType,
  SortedInventoryItemType,
  SortedInventoryType,
} from "./types";
import {filterInventoryByType} from "./helpers";

type Props = {
  items: SortedInventoryType;
  onSearch: ({steamId}: {steamId?: string}) => void;
};

export const InventoryList: FC<Props> = ({items, onSearch}) => {
  const {inventory} = items;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(inputRef);
    onSearch({steamId: inputRef?.current?.value});
  };

  const cases = filterInventoryByType({
    inventory,
    type: InventoryType.BaseGradeContainer,
  });

  return (
    <>
      <div className={styles.searchBlock}>
        <form autoComplete="on" action="">
          <div>
            <label htmlFor="steamId"></label>
            <input
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
        <h2 className={styles.title}>{`Total Items: ${cases.length}`}</h2>
        <ul className={styles.items}>
          {cases.map((item: SortedInventoryItemType, index) => (
            <InventoryItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
