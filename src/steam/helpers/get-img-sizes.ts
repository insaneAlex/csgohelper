import {ImgSize} from '@/types';
import {ScreenSizes} from '../constants';

export const getImgSizes = ({screenSize}: {screenSize: ScreenSizes}): ImgSize => {
  switch (screenSize) {
    case ScreenSizes.Lg:
      return {width: 116, height: 89};
    case ScreenSizes.Md:
      return {width: 116, height: 89};
    case ScreenSizes.Sm:
      return {width: 116, height: 89};
    case ScreenSizes.Xs:
      return {width: 58, height: 40};
    case ScreenSizes.Xxs:
      return {width: 58, height: 40};
    default:
      return {width: 128, height: 99};
  }
};
