import {PriceType} from './src/services';

export enum TagsType {
  CATEGORY = 'category',
  INTERNAL_NAME = 'internal_name',
  LOCALIZED_CATEGORY_NAME = 'localized_category_name',
  LOCALIZED_TAG_NAME = 'localized_tag_name',
  COLOR = 'color'
}

export type TagsTypeIndex = {
  [key in TagsType]: string;
};

export type InventoryItemType = {
  name: string;
  type: string;
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
export type ImgSize = {width: number; height: number};

export type NumObject = Record<string, number>;
