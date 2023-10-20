import React, {FC} from 'react';

import styles from './search-inventory.module.scss';
import classNames from 'classnames';

type Props = {
  id: string;
  disabled: boolean;
  onSearch: () => void;
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInventory: FC<Props> = ({id, disabled, onSearch, onIdChange}) => {
  return (
    <section className={styles.searchBlock}>
      <form autoComplete="on">
        <label htmlFor="steamId">
          <input
            defaultValue={id}
            onChange={onIdChange}
            className={styles.input}
            placeholder="Enter your SteamID"
            type="text"
            id="steamId"
          />
        </label>
      </form>

      <button
        className={classNames(styles.searchBtn, {[styles.searchBtnDisabled]: disabled})}
        disabled={disabled}
        onClick={onSearch}
      >
        SEARCH BY SteamID
      </button>
    </section>
  );
};
