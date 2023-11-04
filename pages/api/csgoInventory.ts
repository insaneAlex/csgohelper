import {calculateInventoryWithPrices, getByTagName, getFormattedDate, isNumeric} from '@/server-helpers';
import {PriceCacheType, fetchPrices} from '@/src/services/fetch-prices';
import {NextApiRequest, NextApiResponse} from 'next';
import {SteamFetchErrors} from '@/src/redux';
import {InventoryItemType} from '@/types';
import {awsServices} from '@/src/services';
import {InventoryApi} from '@/src/services/inventory';
import {InventoryGlobalType} from '@/src/services/types';

export type CS2InventoryFetchErrorType = {
  response?: {status: number};
  steamAccountFetchError?: string;
  dynamoDBAccountFetchError?: string;
};
export type inventoryCacheType = {inventory?: null | string; update_time?: string | null};
type inventoryCacheTypes = Record<string, inventoryCacheType>;

const THIRD_OF_THE_DAY = 8 * 60 * 60 * 1000;
const cache: PriceCacheType = {prices: null, lastUpdated: null};
const inventoryCache: inventoryCacheTypes = {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const storedSteamid = req.query.storedSteamid as string;
  const steamid = req.query.steamid as string;

  const now = new Date();

  if (!cache.prices || !cache.lastUpdated || now.getTime() - cache.lastUpdated.getTime() > THIRD_OF_THE_DAY) {
    await fetchPrices({cache});
  }

  if (!steamid && !storedSteamid) {
    return res.json({statusCode: 404, inventory: '[]', error: 'NO_STEAMID_PROVIDED'});
  }

  if (storedSteamid || !isNumeric(steamid as string)) {
    if (!inventoryCache?.[storedSteamid as string]?.inventory) {
      inventoryCache[storedSteamid as string] = {} as inventoryCacheType;

      const response = await awsServices.fetchFromDynamoDB(storedSteamid, inventoryCache[storedSteamid], cache.prices);
      return res.json(response);
    } else
      return res.json({
        statusCode: 201,
        inventory: cache.prices
          ? JSON.stringify(
              calculateInventoryWithPrices({
                inventory: JSON.parse(inventoryCache?.[storedSteamid as string]?.inventory as string),
                prices: cache.prices
              })
            )
          : inventoryCache?.[storedSteamid as string]?.inventory,
        update_time: inventoryCache?.[storedSteamid as string]?.update_time
      });
  }

  try {
    const {items}: {items: InventoryGlobalType[]} = await Object.create(InventoryApi).get({steamid});

    const minimizedInventory = items.map(({assetid, name, market_hash_name, name_color, icon_url, tags}) => {
      const exterior = getByTagName({tags, tagName: 'Exterior'}).localized_tag_name;
      const type = getByTagName({tags, tagName: 'Type'}).localized_tag_name;
      const weapon = getByTagName({tags, tagName: 'Weapon'})?.localized_tag_name;
      const rarity_color = getByTagName({tags, tagName: 'Rarity'}).color;

      return {type, name, assetid, exterior, icon_url, name_color, market_hash_name, weapon, rarity_color};
    }) as InventoryItemType[];

    const update_time = getFormattedDate();

    const withPrices = cache.prices
      ? calculateInventoryWithPrices({inventory: minimizedInventory, prices: cache.prices})
      : minimizedInventory;

    await awsServices.updateDynamoInventoryRecord(steamid, minimizedInventory, update_time);

    inventoryCache[steamid as string] = {} as inventoryCacheType;
    inventoryCache[steamid as string].inventory = JSON.stringify(minimizedInventory);
    inventoryCache[steamid as string].update_time = update_time;

    return res.json({statusCode: 200, inventory: JSON.stringify(withPrices)});
  } catch (e) {
    const error = (e || {}) as CS2InventoryFetchErrorType;
    console.log(`STEAM_INVENTORY_FETCH_ERROR`);

    if (error?.response?.status === 429) {
      error.steamAccountFetchError = SteamFetchErrors.TOO_MANY_REQUESTS;
    }

    if (error?.response?.status === 404) {
      return res.status(404).json({statusCode: 404, inventory: '[]'});
    }

    if (error?.response?.status === 403) {
      return res.status(403).json({statusCode: 403, inventory: '[]'});
    }

    const response = await awsServices.fetchFromDynamoDB(steamid, inventoryCache[steamid], cache.prices, {
      ...error,
      dynamoDBAccountFetchError: 'DYNAMO_DB_INVENTORY_FETCH_ERROR'
    });

    return res.json(response);
  }
};

export default handler;
