export type SortedInventoryItemType = {
  type: string;
  name: string;
  classid: string;
  icon_url: string;
  count?: number;
};

export type ReadableInventoryType = {
  total_inventory_count?: number;
  inventory: SortedInventoryItemType[];
};

export enum InventoryItemType {
  BaseGradeContainer = "Base Grade Container",
  BaseGradeGraffiti = "Base Grade Graffiti",
  ExtraordinaryCollectible = "Extraordinary Collectible",
  ConsumerGradeShotgun = "Consumer Grade Shotgun",
  BaseGradePass = "Base Grade Pass",
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
