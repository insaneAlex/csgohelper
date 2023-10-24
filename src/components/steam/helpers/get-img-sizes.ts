import {ImgSize} from '@/types';
import {ScreenSizes} from '../constants';

export const getImgSizes = ({screenSize}: {screenSize: ScreenSizes}): ImgSize => {
  const imgSizes = {md: {width: 110, height: 82}, sm: {width: 140, height: 108}, xs: {width: 77, height: 60}};

  switch (screenSize) {
    case ScreenSizes.Xs:
      return imgSizes.xs;
    case ScreenSizes.Xxs:
      return imgSizes.sm;
    default:
      return imgSizes.md;
  }
};
