export type SteamIDType = {steamid: string};

type PriceOptionType = {
  sold: string;
  median: number;
  average: number;
  lowest_price: number;
  highest_price: number;
  standard_deviation: string;
};

export enum PriceOptions {
  DAY = '24_hours',
  WEEK = '7_days',
  MONTH = '30_days',
  ALL = 'all_time'
}

export type PriceType = {
  [PriceOptions.DAY]: PriceOptionType;
  [PriceOptions.WEEK]: PriceOptionType;
  [PriceOptions.MONTH]: PriceOptionType;
  [PriceOptions.ALL]: PriceOptionType;
};

export type PricesType = {[key: string]: PriceType};
