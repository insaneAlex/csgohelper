import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {InventoryStatuses} from '@/src/redux/features';
import {Button, Separator} from '@/src/components/ui';
import {getItemsStart} from '@/src/redux';
import {useDispatch} from 'react-redux';
import {storage} from '@/src/services';
import {isEmpty} from '../../helpers';
import {STEAMID_PARAM} from '@/core';

import styles from './search-inventory.module.scss';

export const SearchInventory: FC<{inventoryStatus: string}> = ({inventoryStatus}) => {
  const dispatch = useDispatch();
  const [steamid, setSteamid] = useState('');

  const isInitLoading = inventoryStatus === InventoryStatuses.FORCE_LOAD;
  const isForceLoading = inventoryStatus === InventoryStatuses.INIT_LOAD;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value.trim());
  const handleSearch = () => dispatch(getItemsStart({steamid, isForceUpdate: true}));

  useEffect(() => {
    setSteamid(storage.localStorage.get(STEAMID_PARAM) || '');
  }, []);

  const isDisabled = isForceLoading || isInitLoading || isEmpty(steamid);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.fields}>
          <label htmlFor={STEAMID_PARAM} data-testid="search-block">
            <input
              type="text"
              value={steamid}
              id={STEAMID_PARAM}
              onInput={handleChange}
              className={styles.input}
              placeholder="Enter your SteamID"
            />
          </label>
          <Button disabled={isDisabled} onClick={handleSearch} loading={isInitLoading}>
            <p className={styles.buttonText}>Search inventory</p>
          </Button>
        </div>

        <p className={styles.note}>Any public Steam profile ID, for example: 76561198080636799</p>
      </div>

      <Separator noMargin />
    </>
  );
};
