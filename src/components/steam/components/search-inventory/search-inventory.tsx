import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, Separator} from '@/src/components/ui';
import {getItemsStart} from '@/src/redux';
import {useDispatch} from 'react-redux';
import {storage} from '@/src/services';
import {isEmpty} from '../../helpers';
import {STEAMID_PARAM} from '@/core';

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
      <label className={styles.block} htmlFor={STEAMID_PARAM}>
        <input
          type="text"
          value={steamid}
          id={STEAMID_PARAM}
          onInput={handleChange}
          className={styles.input}
          placeholder="Enter your SteamID"
        />
        <Button disabled={isDisabled} onClick={handleSearch} loading={loading}>
          <p className={styles.buttonText}>Search SteamID</p>
        </Button>
      </label>

      <p className={styles.note}>Any public Steam profile ID, for example: 76561198080636799</p>
      <Separator noMargin />
    </>
  );
};
