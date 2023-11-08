import {PriceOptions} from '../components/steam';

type PriceOptionType = {
  sold: string;
  median: number;
  average: number;
  lowest_price: number;
  highest_price: number;
  standard_deviation: string;
};

export type PriceType = {
  [PriceOptions.DAY]: PriceOptionType;
  [PriceOptions.WEEK]: PriceOptionType;
  [PriceOptions.MONTH]: PriceOptionType;
  [PriceOptions.ALL]: PriceOptionType;
};
