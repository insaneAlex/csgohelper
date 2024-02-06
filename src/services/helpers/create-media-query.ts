import {DeviceSizeType} from '../types';
import {isClient} from './is-client';

const createMediaQueryExpression = ({minWidth = 0, maxWidth}: DeviceSizeType) =>
  maxWidth ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)` : `(min-width: ${minWidth}px)`;

export const createMediaQuery = ({minWidth = 0, maxWidth}: DeviceSizeType) =>
  (isClient() && window.matchMedia(createMediaQueryExpression({minWidth, maxWidth}))) as MediaQueryList;
