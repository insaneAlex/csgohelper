import {NumObject} from '@/types';

export enum PriceOptions {
  DAY = '24_hours',
  WEEK = '7_days',
  MONTH = '30_days',
  ALL = 'all_time'
}

export type GridConfigType = Record<string, NumObject>;
