type DescriptionsType = {
  type: string;
  value: string;
  color?: string;
};

type TagsType = {
  category: string;
  internal_name: string;
  localized_category_name: string;
  localized_tag_name: string;
  color?: string;
};

export enum ItemType {
  Container = "Base Grade Container",
  BaseGradeGraffiti = "Base Grade Graffiti",
  Collectible = "Extraordinary Collectible",
  ConsumerGradeShotgun = "Consumer Grade Shotgun",
  Pass = "Base Grade Pass",
  HighGradeSticker = "High Grade Sticker",
  RemarkableSticker = "Remarkable Sticker",
  BaseGradeTool = "Base Grade Tool",
  SouvenirRestrictedSMG = "Souvenir Restricted SMG",
  ConsumerGradePistol = "Consumer Grade Pistol",
  ConsumerGradeSMG = "Consumer Grade SMG",
  ConsumerGradeRifle = "Consumer Grade Rifle",
  RestrictedShotgun = "Restricted Shotgun",
  MilSpecGradeSMG = "StatTrak™ Mil-Spec Grade SMG",
  RestrictedPistol = "Restricted Pistol",
  RestrictedSniperRifle = "Restricted Sniper Rifle",
  MilSpecGradeShotgun = "Mil-Spec Grade Shotgun",
  IndustrialGradeRifle = "Industrial Grade Rifle",
  RestrictedSMG = "Restricted SMG",
  HighGradeMusicKit = "StatTrak™ High Grade Music Kit",
  CovertPistol = "Covert Pistol",
}

export const FORMATTED_TYPE_LABELS = [
  ItemType.Container,
  ItemType.Collectible,
  ItemType.Pass,
];

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
  tags: TagsType[];
  market_buy_country_restriction?: string;
  actions?: {link: string; name: string}[];
  market_actions?: {link: string; name: string}[];
};
