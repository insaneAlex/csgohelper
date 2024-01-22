import {useEffect, useState} from 'react';
import {
  LARGE_SCREEN_RANGE,
  MEDIUM_SCREEN_RANGE,
  SMALL_SCREEN_RANGE,
  createMediaQuery
} from '../services/screen/helpers';

const useListenToMediaQuery = (query: {minWidth?: number; maxWidth?: number}, onMatch: () => void) => {
  useEffect(() => {
    const mediaQuery = createMediaQuery(query);
    const handler = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onMatch();
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mediaQuery.addListener(handler);

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mediaQuery.removeListener(handler);
    };
  }, []);
};

type Props = {small?: boolean; medium?: boolean; large?: boolean};
export const useMedia = ({small = false, medium = small, large = medium}: Props) => {
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (createMediaQuery(SMALL_SCREEN_RANGE).matches) {
      return small;
    } // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (createMediaQuery(MEDIUM_SCREEN_RANGE).matches) {
      return medium;
    }

    return large;
  });

  useListenToMediaQuery(SMALL_SCREEN_RANGE, () => setValue(small));
  useListenToMediaQuery(MEDIUM_SCREEN_RANGE, () => setValue(medium));
  useListenToMediaQuery(LARGE_SCREEN_RANGE, () => setValue(large));

  return value;
};
