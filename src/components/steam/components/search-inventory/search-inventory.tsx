import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {InventoryStatuses} from '@/src/redux/features';
import {Button, Separator} from '@/src/components/ui';
import {getSteamid, isEmpty} from '../../helpers';
import {getItemsStart} from '@/src/redux';
import {useDispatch} from 'react-redux';
import {storage} from '@/src/services';
import {STEAMID_PARAM} from '@/core';

import styles from './search-inventory.module.scss';

export const SearchInventory: FC<{inventoryStatus: string}> = ({inventoryStatus}) => {
  const dispatch = useDispatch();
  const [steamid, setSteamid] = useState('');

  const isInitLoading = inventoryStatus === InventoryStatuses.FORCE_LOAD;
  const isForceLoading = inventoryStatus === InventoryStatuses.INIT_LOAD;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value.trim());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(getItemsStart({steamid: getSteamid(steamid), isForceUpdate: true}));
  };

  useEffect(() => {
    setSteamid(storage.localStorage.get(STEAMID_PARAM) || '');
  }, []);

  const isDisabled = isForceLoading || isInitLoading || isEmpty(steamid);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} data-testid="search-form">
        <fieldset className={styles.fieldset}>
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
          <Button disabled={isDisabled} isSubmit loading={isInitLoading}>
            <p className={styles.buttonText}>Search inventory</p>
          </Button>
        </fieldset>

        <p className={styles.note}>Enter your SteamID, nickname of profile link to calculate inventory value</p>
      </form>

      <Separator />
    </>
  );
};
