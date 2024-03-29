import {SteamProfileType} from '@/core/types';
import {InventoryItemType} from '..';
import {PriceType} from '../types';

export type AWSConfigType = {region: string; credentials: {accessKeyId: string; secretAccessKey: string}};
export type PricesType = Record<string, {price: PriceType}> | null;
export type NoPriceInventory = Omit<InventoryItemType, 'prices'>[];
export type InventoryRecordType = {
  inventory?: NoPriceInventory;
  update_time?: string;
  customUrl?: string;
  profile?: SteamProfileType;
};
export type InventoryCacheType = Record<string, InventoryRecordType>;
