const styles = {
  iphonex: '376px',
  medium: '768px',
  large: '1024px',
  xxlarge: '1500px'
};

export const screenSizes = {
  iphonex: parseInt(styles.iphonex, 10),
  medium: parseInt(styles.medium, 10),
  large: parseInt(styles.large, 10),
  xxlarge: parseInt(styles.xxlarge, 10)
};

export const SMALL_SCREEN_RANGE = {maxWidth: screenSizes.large};
export const MEDIUM_SCREEN_RANGE = {minWidth: screenSizes.medium, maxWidth: screenSizes.large};
export const LARGE_SCREEN_RANGE = {minWidth: screenSizes.large};
export enum SCREEN_VALUE {
  Small = 0,
  Medium = 1,
  Large = 2
}

export const createMediaQueryExpression = ({minWidth = 0, maxWidth}: {minWidth?: number; maxWidth?: number}) => {
  let mediaQuery = `(min-width: ${minWidth}px)`;
  if (maxWidth) {
    mediaQuery += ` and (max-width: ${maxWidth}px)`;
  }
  return mediaQuery;
};

export const createMediaQuery = ({minWidth = 0, maxWidth}: {minWidth?: number; maxWidth?: number}) => {
  const mediaQueryExpression = createMediaQueryExpression({minWidth, maxWidth});
  return typeof window !== 'undefined' && window.matchMedia(mediaQueryExpression);
};
