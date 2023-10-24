import {PriceType} from './src/services';

export enum TagsType {
  CATEGORY = 'category',
  INTERNAL_NAME = 'internal_name',
  LOCALIZED_CATEGORY_NAME = 'localized_category_name',
  LOCALIZED_TAG_NAME = 'localized_tag_name',
  COLOR = 'color'
}

export type ItemType = Readonly<
  | 'Sniper Rifle'
  | 'Collectible'
  | 'Machinegun'
  | 'Music Kit'
  | 'Container'
  | 'Graffiti'
  | 'Sticker'
  | 'Shotgun'
  | 'Pistol'
  | 'Knife'
  | 'Rifle'
  | 'Tool'
  | 'Pass'
  | 'SMG'
>;

export const ItemTypes: ItemType[] = [
  'Sniper Rifle',
  'Collectible',
  'Machinegun',
  'Music Kit',
  'Container',
  'Graffiti',
  'Sticker',
  'Shotgun',
  'Pistol',
  'Knife',
  'Rifle',
  'Tool',
  'Pass',
  'SMG'
];

export type TagsTypeIndex = {
  [key in TagsType]: string;
};

export type InventoryItemType = {
  assetid: string;
  count?: number;
  exterior?: string;
  icon_url: string;
  name: string;
  name_color: string;
  rarity_color: string;
  type: ItemType;
  market_hash_name: string;
  prices: PriceType;
};
export type ImgSize = {width: number; height: number};

export type NumObject = {[key: string]: number};
