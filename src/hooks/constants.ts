import styles from 'styles/export.module.scss';

const screenSizes = {
  mobile: parseInt(styles.mobile, 10),
  medium: parseInt(styles.medium, 10),
  large: parseInt(styles.large, 10),
  xlarge: parseInt(styles.xlarge, 10)
};

export const DESKTOP_ROWS = 5;
export const TABLET_ROWS = 10;
export const MOBILE_ROWS = 15;

export const MOBILE_SCREEN_RANGE = {maxWidth: screenSizes.mobile};
export const SMALL_SCREEN_RANGE = {minWidth: screenSizes.mobile + 1, maxWidth: screenSizes.medium};
export const MEDIUM_SCREEN_RANGE = {minWidth: screenSizes.medium + 1, maxWidth: screenSizes.large};
export const LARGE_SCREEN_RANGE = {minWidth: screenSizes.large + 1, maxWidth: screenSizes.xlarge};
export const X_LARGE_SCREEN_RANGE = {minWidth: screenSizes.xlarge};
