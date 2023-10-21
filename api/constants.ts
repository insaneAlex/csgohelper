export const inventoryImageBaseUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/';

export const getInventoryEndpoint = process.env.NEXT_PUBLIC_INVENTORY_ENDPOINT;

export const STEAMID_PARAM = 'steamid';
export const FILTERS_PARAM = 'filters';

export const DYNAMO_DB_FETCH_INVENTORY_ERROR = 'DYNAMO_DB_FETCH_INVENTORY_ERROR';
export const PRICES_API_URL = 'http://csgobackpack.net/api/GetItemsList/v2/';
export const NO_STEAMID_PROVIDED = 'NO_STEAMID_PROVIDED';
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const INVENTORY_TABLE = 'inventories';
export const AWS_REGION = 'eu-central-1';
