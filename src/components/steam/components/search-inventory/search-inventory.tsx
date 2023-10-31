import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {storage} from '@/src/services';
import {getItemsStart} from '@/src/redux';
import {useDispatch} from 'react-redux';
import {isEmpty} from '../../helpers';
import {STEAMID_PARAM} from '@/core';
import classNames from 'classnames';

import styles from './search-inventory.module.scss';

export const SearchInventory: FC<{disabled: boolean}> = ({disabled}) => {
  const dispatch = useDispatch();
  const [steamid, setSteamid] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value.trim());
  const handleSearch = () => dispatch(getItemsStart({steamid}));

  useEffect(() => {
    setSteamid(storage.localStorage.get(STEAMID_PARAM) || '');
  }, []);

  const isDisabled = disabled || isEmpty(steamid);
  return (
    <section className={styles.searchBlock}>
      <label htmlFor={STEAMID_PARAM}>
        <input
          value={steamid}
          onInput={handleChange}
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
