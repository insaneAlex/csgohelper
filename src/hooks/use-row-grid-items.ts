import {useState} from 'react';
import {useListenToMediaQuery} from './use-media';
import {createMediaQuery} from '../services';
import styles from 'styles/export.module.scss';
import {
  MOBILE_ROWS,
  TABLET_ROWS,
  DESKTOP_ROWS,
  SMALL_SCREEN_RANGE,
  LARGE_SCREEN_RANGE,
  MEDIUM_SCREEN_RANGE,
  MOBILE_SCREEN_RANGE,
  X_LARGE_SCREEN_RANGE
} from './constants';

export const useRowGridItems = () => {
  const getGridConfig = (rowItems: unknown, rowsAmount: number) => ({itemsPerRow: rowItems as number, rowsAmount});
  const [value, setValue] = useState(() => {
    if (createMediaQuery(MOBILE_SCREEN_RANGE).matches) {
      return getGridConfig(styles.mobileGridRowItems, MOBILE_ROWS);
    }
    if (createMediaQuery(SMALL_SCREEN_RANGE).matches) {
      return getGridConfig(styles.smallGridRowItems, TABLET_ROWS);
    }
    if (createMediaQuery(MEDIUM_SCREEN_RANGE).matches) {
      return getGridConfig(styles.mediumGridRowItems, TABLET_ROWS);
    }
    if (createMediaQuery(LARGE_SCREEN_RANGE).matches) {
      return getGridConfig(styles.largeGridRowItems, DESKTOP_ROWS);
    }
    return getGridConfig(styles.xLargeGridRowItems, DESKTOP_ROWS);
  });

  useListenToMediaQuery(MOBILE_SCREEN_RANGE, () => setValue(getGridConfig(styles.mobileGridRowItems, MOBILE_ROWS)));
  useListenToMediaQuery(SMALL_SCREEN_RANGE, () => setValue(getGridConfig(styles.smallGridRowItems, TABLET_ROWS)));
  useListenToMediaQuery(MEDIUM_SCREEN_RANGE, () => setValue(getGridConfig(styles.mediumGridRowItems, TABLET_ROWS)));
  useListenToMediaQuery(LARGE_SCREEN_RANGE, () => setValue(getGridConfig(styles.largeGridRowItems, DESKTOP_ROWS)));
  useListenToMediaQuery(X_LARGE_SCREEN_RANGE, () => setValue(getGridConfig(styles.xLargeGridRowItems, DESKTOP_ROWS)));

  return value;
};
