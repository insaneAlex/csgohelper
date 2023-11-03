import {TagsTypeIndex} from '@/types';
import {PriceOptions} from '../components/steam';

type PriceOptionType = {
  sold: string;
  median: number;
  average: number;
  lowest_price: number;
  highest_price: number;
  standard_deviation: string;
};

type ItemDescription = {
  type: string;
  value: string;
  color?: string;
};

type ItemAction = {
  link: string;
  name: string;
};

export type PriceType = {
  [PriceOptions.DAY]: PriceOptionType;
  [PriceOptions.WEEK]: PriceOptionType;
  [PriceOptions.MONTH]: PriceOptionType;
  [PriceOptions.ALL]: PriceOptionType;
};

export type InventoryGlobalType = {
  id: string;
  name: string;
  appid: number;
  count?: number;
  amount: string;
  assetid: string;
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
  actions?: ItemAction[];
  fraudwarnings: string[];
  icon_url_large?: string;
  background_color: string;
  market_hash_name: string;
  market_actions?: ItemAction[];
  descriptions: ItemDescription[];
  market_tradable_restriction: string;
  market_marketable_restriction: string;
  market_buy_country_restriction?: string;
};

export type Descriptions = {
  appid: number;
  name: string;
  type: string;
  classid: string;
  currency: number;
  icon_url: string;
  tradable: number;
  commodity: number;
  name_color: string;
  market_name: string;
  instanceid: string;
  marketable: number;
  tags: TagsTypeIndex[];
  actions: ItemAction[];
  icon_url_large: string;
  market_hash_name: string;
  background_color: string;
  market_actions: ItemAction[];
  descriptions: ItemDescription[];
  market_tradable_restriction: number;
};

export type ItemType = {
  id?: string;
  appid: number;
  contextid: string;
  assetid: string;
  is_currency: string;
  tradable: string;
  marketable: string;
  fraudwarnings?: [];
  descriptions?: ItemDescription[];
  commodity: string;
  classid: string;
  instanceid: string;
  market_tradable_restriction: string;
  market_marketable_restriction: string;
  amount: string;
};
