import {createMediaQueryExpression} from './create-media-query-expression';
import {DeviceSizeType} from '../types';

export const createMediaQuery = ({minWidth = 0, maxWidth}: DeviceSizeType) =>
  (typeof window !== 'undefined' &&
    window.matchMedia(createMediaQueryExpression({minWidth, maxWidth}))) as MediaQueryList;
