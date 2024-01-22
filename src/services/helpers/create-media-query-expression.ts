import {DeviceSizeType} from '../types';

export const createMediaQueryExpression = ({minWidth = 0, maxWidth}: DeviceSizeType) =>
  maxWidth ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)` : `(min-width: ${minWidth}px)`;
