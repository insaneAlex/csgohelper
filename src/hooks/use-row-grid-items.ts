import {useState} from 'react';
import {useListenToMediaQuery} from './use-media';
import {createMediaQuery} from '../services/helpers';
import styles from 'styles/export.module.scss';
import {
  LARGE_SCREEN_RANGE,
  MEDIUM_SCREEN_RANGE,
  MOBILE_SCREEN_RANGE,
  SMALL_SCREEN_RANGE,
  X_LARGE_SCREEN_RANGE
} from './constants';

export const useRowGridItems = () => {
  const getGridConfig = (rowItems: unknown, rowsAmount: number) => ({itemsPerRow: rowItems as number, rowsAmount});
  const [value, setValue] = useState(() => {
    if (createMediaQuery(MOBILE_SCREEN_RANGE).matches) {
      return getGridConfig(styles.mobileGridRowItems, 15);
    }
    if (createMediaQuery(SMALL_SCREEN_RANGE).matches) {
      return getGridConfig(styles.smallGridRowItems, 10);
    }
    if (createMediaQuery(MEDIUM_SCREEN_RANGE).matches) {
      return getGridConfig(styles.mediumGridRowItems, 10);
    }
    if (createMediaQuery(LARGE_SCREEN_RANGE).matches) {
      return getGridConfig(styles.largeGridRowItems, 5);
    }
    return getGridConfig(styles.xLargeGridRowItems, 6);
  });

  useListenToMediaQuery(MOBILE_SCREEN_RANGE, () => setValue(getGridConfig(styles.mobileGridRowItems, 15)));
  useListenToMediaQuery(SMALL_SCREEN_RANGE, () => setValue(getGridConfig(styles.smallGridRowItems, 10)));
  useListenToMediaQuery(MEDIUM_SCREEN_RANGE, () => setValue(getGridConfig(styles.mediumGridRowItems, 10)));
  useListenToMediaQuery(LARGE_SCREEN_RANGE, () => setValue(getGridConfig(styles.largeGridRowItems, 5)));
  useListenToMediaQuery(X_LARGE_SCREEN_RANGE, () => setValue(getGridConfig(styles.xLargeGridRowItems, 6)));

  return value;
};
