type DescriptionsType = {
  type: string;
  value: string;
  color?: string;
};

export enum TagsType {
  CATEGORY = "category",
  INTERNAL_NAME = "internal_name",
  LOCALIZED_CATEGORY_NAME = "localized_category_name",
  LOCALIZED_TAG_NAME = "localized_tag_name",
  COLOR = "color",
}

export type ItemType = Readonly<
  | "Pistol"
  | "Container"
  | "Sniper Rifle"
  | "Shotgun"
  | "Rifle"
  | "SMG"
  | "Machinegun"
  | "Graffiti"
  | "Pass"
  | "Collectible"
  | "Music Kit"
  | "Tool"
>;

export const ItemTypes: ItemType[] = [
  "Pistol",
  "Container",
  "Sniper Rifle",
  "Shotgun",
  "Rifle",
  "SMG",
  "Machinegun",
  "Graffiti",
  "Pass",
  "Collectible",
  "Music Kit",
  "Tool",
];

type TagsTypeIndex = {
  [key in TagsType]: string;
};

export type InventoryItemType = {
  amount: number;
  appid: number;
  assetid?: string;
  contextid?: string;
  classid: string;
  instanceid: string;
  id: string;
  is_currency: boolean;
  currency: number;
  market_marketable_restriction?: number;
  background_color: string;
  icon_url: string;
  icon_url_large?: string;
  descriptions: DescriptionsType[];
  tradable: boolean;
  fraudwarnings: string[];
  owner_descriptions?: DescriptionsType[];
  name: string;
  name_color: string;
  type: ItemType;
  market_name: string;
  market_hash_name: string;
  commodity: boolean;
  market_tradable_restriction: number;
  marketable: boolean;
  tags: TagsTypeIndex[];
  market_buy_country_restriction?: string;
  actions?: {link: string; name: string}[];
  market_actions?: {link: string; name: string}[];
};

export type NumObject = {[key: string]: number};
