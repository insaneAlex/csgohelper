import {PriceOptions} from '../components/steam';
import {PricesType} from './aws/types';

type PriceOptionType = {
  sold: string;
  median: number;
  average: number;
  lowest_price: number;
  highest_price: number;
  standard_deviation: string;
};

export type PriceCacheType = {prices: PricesType; lastUpdated: Date | null};

export type PriceType = {
  [PriceOptions.DAY]: PriceOptionType;
  [PriceOptions.WEEK]: PriceOptionType;
  [PriceOptions.MONTH]: PriceOptionType;
  [PriceOptions.ALL]: PriceOptionType;
};

export type DeviceSizeType = {minWidth?: number; maxWidth?: number};
