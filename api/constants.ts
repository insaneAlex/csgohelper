export const inventoryImageBaseUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/';
export const PRICES_API_URL = 'http://csgobackpack.net/api/GetItemsList/v2/?no_details=true';

export const STEAMID_PARAM = 'steamid';
export const FILTERS_PARAM = 'filters';

export const INVENTORY_TABLE = 'inventories';
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const AWS_REGION = 'eu-central-1';

export const INVENTORY_ERRORS = {
  DYNAMO_DB_INVENTORY_FETCH_ERROR: 'DYNAMO_DB_INVENTORY_FETCH_ERROR',
  STEAM_INVENTORY_FETCH_ERROR: 'STEAM_INVENTORY_FETCH_ERROR',
  PRICES_API_FETCH_ERROR: 'PRICES_API_FETCH_ERROR',
  NO_STEAMID_PROVIDED: 'NO_STEAMID_PROVIDED'
};

export const STEAM_FETCH_ERRORS = {
  PRIVATE_INVENTORY_ERROR: 'PRIVATE_INVENTORY_ERROR',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  PROFILE_NOT_FOUND: 'PROFILE_NOT_FOUND'
};

export const fetchInventoryUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/csgoInventory` : '';
