import {isClient} from '@/src/services';

export const fetchInventoryUrl = isClient() ? `${window.location.origin}/api/csgoInventory` : '';

export const STEAMID_PARAM = 'steamid';
