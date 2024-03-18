import {PriceCacheType} from '@/src/services';
import {THIRD_OF_THE_DAY} from './constants';

export const getShouldFetchPrices = (time: Date, cache: PriceCacheType) =>
  !cache.prices || !cache.lastUpdated || time.getTime() - cache.lastUpdated.getTime() > THIRD_OF_THE_DAY;
