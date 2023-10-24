import {TagsTypeIndex} from '@/types';
import {PriceOptions} from '../components/steam';

export type InventoryGlobalType = {
  id: string;
  name: string;
  appid: number;
  count?: number;
  amount: string;
  assetid: string;
  descriptions: [];
  icon_url: string;
  exterior: string;
  classid: string;
  currency: number;
  tradable: boolean;
  commodity: boolean;
  name_color: string;
  contextid?: string;
  instanceid: string;
  marketable: boolean;
  market_name: string;
  is_currency: boolean;
  tags: TagsTypeIndex[];
  owner?: string | null;
  fraudwarnings: string[];
  icon_url_large?: string;
  background_color: string;
  market_hash_name: string;
  market_tradable_restriction: string;
  market_marketable_restriction: string;
  market_buy_country_restriction?: string;
  actions?: {link: string; name: string}[];
  market_actions?: {link: string; name: string}[];
};

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
