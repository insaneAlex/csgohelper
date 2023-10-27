import React, {FC} from 'react';
import classNames from 'classnames';

import styles from './search-inventory.module.scss';

type Props = {
  id: string | null;
  disabled: boolean;
  onSearch: () => void;
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInventory: FC<Props> = ({id, disabled, onSearch, onIdChange}) => {
  const isDisabled = disabled || id?.length === 0;
  return (
    <section className={styles.searchBlock}>
      <form autoComplete="on">
        <label htmlFor="steamId">
          <input
            defaultValue={id || ''}
            onChange={onIdChange}
            className={styles.input}
            placeholder="Enter your SteamID"
            type="text"
            id="steamId"
          />
        </label>
      </form>

      <button
        className={classNames(styles.searchBtn, {[styles.searchBtnDisabled]: isDisabled})}
        disabled={isDisabled}
        onClick={onSearch}
      >
        SEARCH BY SteamID
      </button>
    </section>
  );
};
