import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button} from '@/src/components/ui';
import {getItemsStart} from '@/src/redux';
import {useDispatch} from 'react-redux';
import {storage} from '@/src/services';
import {isEmpty} from '../../helpers';
import {STEAMID_PARAM} from '@/core';
import classNames from 'classnames';

import styles from './search-inventory.module.scss';

type Props = {disabled: boolean; loading: boolean};

export const SearchInventory: FC<Props> = ({loading, disabled}) => {
  const dispatch = useDispatch();
  const [steamid, setSteamid] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value.trim());
  const handleSearch = () => dispatch(getItemsStart({steamid}));

  useEffect(() => {
    setSteamid(storage.localStorage.get(STEAMID_PARAM) || '');
  }, []);

  const isDisabled = loading || disabled || isEmpty(steamid);

  return (
    <>
      <section className={styles.searchBlock}>
        <label htmlFor={STEAMID_PARAM}>
          <input
            type="text"
            value={steamid}
            id={STEAMID_PARAM}
            onInput={handleChange}
            className={styles.input}
            placeholder="Enter your SteamID"
          />
        </label>
        <Button disabled={isDisabled} onClick={handleSearch} loading={loading}>
          <p className={classNames(styles.buttonText, {[styles.disabled]: isDisabled})}>Search SteamID</p>
        </Button>
      </section>
      <p className={styles.note}>Any public Steam profile ID, for example: 76561198080636799</p>
    </>
  );
};
