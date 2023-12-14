import {PriceType} from '../types';

type ItemDescription = {
  type: string;
  value: string;
  color?: string;
};

type ItemAction = {
  link: string;
  name: string;
};

export type TagsType = 'category' | 'internal_name' | 'localized_category_name' | 'localized_tag_name' | 'color';
export type TagsTypeIndex = Record<TagsType, string>;

export type GetInventoryParams = {
  steamid: string;
  appid?: number;
  contextid?: number;
  count?: number;
  language?: string;
  tradable?: boolean;
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

export type InventoryResponseType = {
  success: string;
  total_inventory_count: number;
  assets: ItemType[];
  descriptions: Descriptions[];
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

export type InventoryItemType = {
  name: string;
  type: string;
  price?: number;
  count?: number;
  weapon?: string;
  assetid: string;
  icon_url: string;
  prices: PriceType;
  exterior?: string;
  isEmpty?: boolean;
  name_color: string;
  rarity_color: string;
  market_hash_name: string;
};
