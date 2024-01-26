import {useEffect, useState} from 'react';
import {createMediaQuery} from '../services';
import {DeviceSizeType} from '../services/types';
import {
  LARGE_SCREEN_RANGE,
  MEDIUM_SCREEN_RANGE,
  MOBILE_SCREEN_RANGE,
  SMALL_SCREEN_RANGE,
  X_LARGE_SCREEN_RANGE
} from './constants';

export const useListenToMediaQuery = (query: DeviceSizeType, onMatch: () => void) => {
  useEffect(() => {
    const mediaQuery = createMediaQuery(query);
    const handler = (event: MediaQueryListEvent) => event?.matches && onMatch();
    mediaQuery.addListener(handler);
    return () => {
      mediaQuery.removeListener(handler);
    };
  }, []);
};

type Props = {mobile?: boolean; small?: boolean; medium?: boolean; large?: boolean; xLarge?: boolean};
export const useMedia = ({mobile = false, small = mobile, medium = small, large = medium, xLarge = large}: Props) => {
  const [value, setValue] = useState(() => {
    if (createMediaQuery(MOBILE_SCREEN_RANGE).matches) {
      return mobile;
    }
    if (createMediaQuery(SMALL_SCREEN_RANGE).matches) {
      return small;
    }
    if (createMediaQuery(MEDIUM_SCREEN_RANGE).matches) {
      return medium;
    }
    if (createMediaQuery(LARGE_SCREEN_RANGE).matches) {
      return large;
    }
    return xLarge;
  });

  useListenToMediaQuery(MOBILE_SCREEN_RANGE, () => setValue(mobile));
  useListenToMediaQuery(SMALL_SCREEN_RANGE, () => setValue(small));
  useListenToMediaQuery(MEDIUM_SCREEN_RANGE, () => setValue(medium));
  useListenToMediaQuery(LARGE_SCREEN_RANGE, () => setValue(large));
  useListenToMediaQuery(X_LARGE_SCREEN_RANGE, () => setValue(xLarge));

  return value;
};
