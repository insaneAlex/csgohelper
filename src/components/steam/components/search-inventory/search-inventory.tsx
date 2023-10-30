import React, {FC} from 'react';
import classNames from 'classnames';
import {isEmpty} from '../../helpers';
import {isClient} from '@/src/services';

import styles from './search-inventory.module.scss';

type Props = {
  id: string | null;
  disabled: boolean;
  onSearch: () => void;
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInventory: FC<Props> = ({id, disabled, onSearch, onIdChange}) => {
  // need isClient check, because id uses localStorage, on server we dont have access to it, and it returns different value on server and client
  const isDisabled = isClient() ? disabled || isEmpty(id) : disabled;

  return (
    <section className={styles.searchBlock}>
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

      <button
        className={classNames(styles.search, {[styles.searchDisabled]: isDisabled})}
        disabled={isDisabled}
        onClick={onSearch}
      >
        SEARCH BY SteamID
      </button>
    </section>
  );
};
