import {ScreenSizes, screenSizes} from '../constants';

type Props = {width: number};

export const getScreenSize = ({width}: Props) => {
  if (width <= screenSizes.xxs) {
    return ScreenSizes.Xxs;
  } else if (width <= screenSizes.xs) {
    return ScreenSizes.Xs;
  } else if (width <= screenSizes.sm) {
    return ScreenSizes.Sm;
  } else if (width <= screenSizes.md) {
    return ScreenSizes.Md;
  }
  return ScreenSizes.Lg;
};
