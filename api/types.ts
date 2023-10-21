import {TagsTypeIndex} from '@/types';

export type InventoryGlobalType = {
  name: string;
  assetid: string;
  icon_url: string;
  name_color: string;
  amount: string;
  appid: number;
  prices: any;
  count?: number;
  exterior: string;

  contextid?: string;
  classid: string;
  instanceid: string;
  id: string;
  is_currency: boolean;
  currency: number;
  market_marketable_restriction: string;
  background_color: string;
  descriptions: [];
  icon_url_large?: string;
  owner?: string | null;
  tradable: boolean;
  fraudwarnings: string[];

  market_name: string;
  market_hash_name: string;
  commodity: boolean;
  market_tradable_restriction: string;
  marketable: boolean;
  tags: TagsTypeIndex[];
  market_buy_country_restriction?: string;
  actions?: {link: string; name: string}[];
  market_actions?: {link: string; name: string}[];
};
