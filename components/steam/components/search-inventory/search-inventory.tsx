import React, {FC} from "react";
import styles from "./search-inventory.module.scss";

type Props = {
  id: string;
  onSearch: () => void;
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInventory: FC<Props> = ({id, onSearch, onIdChange}) => {
  return (
    <div className={styles.searchBlock}>
      <form autoComplete="on" action="">
        <div>
          <label htmlFor="steamId"></label>
          <input
            defaultValue={id}
            onChange={onIdChange}
            className={styles.input}
            placeholder="Enter your SteamID"
            type="text"
            id="steamId"
          />
        </div>
      </form>
      <div className={styles.searchBtn}>
        <button onClick={onSearch}>SEARCH BY SteamID</button>
      </div>
    </div>
  );
};
