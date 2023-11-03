import {Button, ButtonColor, ButtonShape, ButtonSizes} from '@/src/components/ui';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {MAX_MOBILE_WIDTH} from '@/src/components/layout';
import {useWindowWidth} from '@/src/hooks';
import {getItemsStart} from '@/src/redux';
import {useDispatch} from 'react-redux';
import {storage} from '@/src/services';
import {isEmpty} from '../../helpers';
import {STEAMID_PARAM} from '@/core';
import classNames from 'classnames';

import styles from './search-inventory.module.scss';

export const SearchInventory: FC<{loading: boolean; showNote?: boolean}> = ({loading, showNote}) => {
  const dispatch = useDispatch();
  const [steamid, setSteamid] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSteamid(e.target.value.trim());
  const handleSearch = () => dispatch(getItemsStart({steamid}));
  const isDesktop = useWindowWidth() > MAX_MOBILE_WIDTH;

  const buttonProps = isDesktop
    ? {size: ButtonSizes.Large, color: ButtonColor.Light, shape: ButtonShape.Rounded}
    : {size: ButtonSizes.Medium, color: ButtonColor.Dark, shape: ButtonShape.Straight};

  useEffect(() => {
    setSteamid(storage.localStorage.get(STEAMID_PARAM) || '');
  }, []);

  const isDisabled = loading || isEmpty(steamid);

  return (
    <>
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

        <Button {...buttonProps} disabled={isDisabled} onClick={handleSearch} loading={loading}>
          <p className={classNames(styles.buttonText, {[styles.disabled]: isDisabled})}>SEARCH BY SteamID</p>
        </Button>
      </section>
      {showNote && <p className={styles.note}>Any public Steam profile ID, for example: 76561198080636799</p>}
    </>
  );
};
