import React, {ChangeEvent, FC, useState} from 'react';
import {getItemsStart} from '@/src/redux';
import {isClient, storage} from '@/src/services';
import {useDispatch} from 'react-redux';
import {isEmpty} from '../../helpers';
import {STEAMID_PARAM} from '@/core';
import classNames from 'classnames';

import styles from './search-inventory.module.scss';

export const SearchInventory: FC<{disabled: boolean}> = ({disabled}) => {
  const dispatch = useDispatch();
  const [steamid, setSteamid] = useState(storage.localStorage.get(STEAMID_PARAM) || '');

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value);
  const handleSearch = () => steamid && dispatch(getItemsStart({steamid}));

  // we need isClient check, because id gets its value from localStorage,
  // on server we dont have access to it, and it returns different value on server and client
  const isDisabled = isClient() ? disabled || isEmpty(steamid) : disabled;

  return (
    <section className={styles.searchBlock}>
      <label htmlFor={STEAMID_PARAM}>
        <input
          defaultValue={steamid}
          onChange={handleChangeId}
          className={styles.input}
          placeholder="Enter your SteamID"
          type="text"
          id={STEAMID_PARAM}
        />
      </label>

      <button
        className={classNames(styles.search, {[styles.searchDisabled]: isDisabled})}
        disabled={isDisabled}
        onClick={handleSearch}
      >
        SEARCH BY SteamID
      </button>
    </section>
  );
};
