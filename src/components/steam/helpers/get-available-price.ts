import {PriceType} from '@/src/services';
import {PriceOptions} from '../types';

export const getAvailablePrice = (prices: PriceType): number => {
  return (
    prices?.[PriceOptions.DAY] ||
    prices?.[PriceOptions.WEEK] ||
    prices?.[PriceOptions.MONTH] ||
    prices?.[PriceOptions.ALL]
  )?.average;
};
