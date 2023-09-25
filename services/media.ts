const sizes = {
  iphonex: "376",
  medium: "768",
  large: "1024",
  xxlarge: "1500",
  fullwidth: "1500",
};

export const screenSizes = {
  iphonex: parseInt(sizes.iphonex, 10),
  medium: parseInt(sizes.medium, 10),
  large: parseInt(sizes.large, 10),
  xxlarge: parseInt(sizes.xxlarge, 10),
  fullWidth: parseInt(sizes.fullwidth, 10),
};

export const createMediaQueryExpression = ({
  minWidth = 0,
  maxWidth,
}: {
  minWidth?: number;
  maxWidth?: number;
}) => {
  let mediaQuery = `(min-width: ${minWidth}px)`;
  if (maxWidth) {
    mediaQuery += ` and (max-width: ${maxWidth - 1}px)`;
  }
  return mediaQuery;
};

export const createMediaQuery = ({
  minWidth = 0,
  maxWidth,
}: {
  minWidth?: number;
  maxWidth?: number;
}) => {
  const mediaQueryExpression = createMediaQueryExpression({minWidth, maxWidth});
  return window.matchMedia(mediaQueryExpression);
};

export const matchScreenWidth = ({
  minWidth = 0,
  maxWidth,
}: {
  minWidth?: number;
  maxWidth?: number;
}) => {
  if (process.env.APP_MODE === "client") {
    return createMediaQuery({minWidth, maxWidth}).matches;
  }
  return false;
};

export const isMobile = (): boolean => {
  return matchScreenWidth({maxWidth: screenSizes.medium});
};

export const isTablet = (): boolean => {
  return matchScreenWidth({
    minWidth: screenSizes.medium,
    maxWidth: screenSizes.large,
  });
};

export const isDesktop = (): boolean => {
  return matchScreenWidth({minWidth: screenSizes.large});
};
