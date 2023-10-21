import {PriceType} from './api/types';

export enum TagsType {
  CATEGORY = 'category',
  INTERNAL_NAME = 'internal_name',
  LOCALIZED_CATEGORY_NAME = 'localized_category_name',
  LOCALIZED_TAG_NAME = 'localized_tag_name',
  COLOR = 'color'
}

export type ItemType = Readonly<
  | 'Pistol'
  | 'Container'
  | 'Sniper Rifle'
  | 'Shotgun'
  | 'Rifle'
  | 'SMG'
  | 'Machinegun'
  | 'Graffiti'
  | 'Pass'
  | 'Collectible'
  | 'Music Kit'
  | 'Tool'
>;

export const ItemTypes: ItemType[] = [
  'Pistol',
  'Container',
  'Sniper Rifle',
  'Shotgun',
  'Rifle',
  'SMG',
  'Machinegun',
  'Graffiti',
  'Pass',
  'Collectible',
  'Music Kit',
  'Tool'
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
