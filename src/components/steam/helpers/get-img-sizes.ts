import {ImgSize} from '@/types';
import {ScreenSizes} from '../constants';

export const getImgSizes = ({screenSize}: {screenSize: ScreenSizes}): ImgSize => {
  const imgSizes = {
    lg: {width: 128, height: 99},
    md: {width: 110, height: 82},
    sm: {width: 140, height: 108}
  };

  switch (screenSize) {
    case ScreenSizes.Lg:
      return imgSizes.md;
    case ScreenSizes.Md:
      return imgSizes.md;
    case ScreenSizes.Sm:
      return imgSizes.md;
    case ScreenSizes.Xs:
      return imgSizes.md;
    case ScreenSizes.Xxs:
      return imgSizes.sm;
    default:
      return imgSizes.lg;
  }
};
