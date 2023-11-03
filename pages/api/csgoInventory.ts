import {calculateInventoryWithPrices, getByTagName, getFormattedDate, isNumeric} from '@/server-helpers';
import {PriceCacheType, fetchPrices} from '@/src/services/fetch-prices';
import {fetchFromDynamoDB} from '@/src/services/fetch-from-dynamo-db';
import {AWS_REGION, INVENTORY_TABLE} from '@/src/services';
import {InventoryGlobalType} from '@/src/services/types';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {InventoryApi} from '@/src/services/inventory';
import {NextApiRequest, NextApiResponse} from 'next';
import {UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {SteamFetchErrors} from '@/src/redux';
import {InventoryItemType} from '@/types';
import {ENV} from '@/src/services/environment';

export type CS2InventoryFetchErrorType = {
  response?: {status: number};
  steamAccountFetchError?: string;
  dynamoDBAccountFetchError?: string;
};
export type inventoryCacheType = {inventory?: null | string; update_time?: string | null};
type inventoryCacheTypes = Record<string, inventoryCacheType>;

const ONE_DAY = 24 * 60 * 60 * 1000;
const cache: PriceCacheType = {prices: null, lastUpdated: null};
const inventoryCache: inventoryCacheTypes = {};
const {AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey} = ENV;
const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid, storedSteamid} = req.query;

  const now = new Date();

  if (!cache.prices || !cache.lastUpdated || now.getTime() - cache.lastUpdated.getTime() > ONE_DAY) {
    await fetchPrices({cache});
  }

  if (!steamid && !storedSteamid) {
    return res.json({statusCode: 404, inventory: '[]', error: 'NO_STEAMID_PROVIDED'});
  }

  if (storedSteamid || !isNumeric(steamid as string)) {
    if (!inventoryCache?.[storedSteamid as string]?.inventory) {
      inventoryCache[storedSteamid as string] = {} as inventoryCacheType;

      const response = await fetchFromDynamoDB({
        prices: cache.prices,
        inventoryCache: inventoryCache[storedSteamid as string],
        steamid: storedSteamid as string
      });
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

    const command = new UpdateCommand({
      Key: {steamid},
      TableName: INVENTORY_TABLE,
      UpdateExpression: 'SET inventory=:inventory, update_time=:update_time',
      ExpressionAttributeValues: {':inventory': JSON.stringify(minimizedInventory), ':update_time': update_time}
    });

    const withPrices = cache.prices
      ? calculateInventoryWithPrices({inventory: minimizedInventory, prices: cache.prices})
      : minimizedInventory;

    await client.send(command);

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

    const response = await fetchFromDynamoDB({
      inventoryCache: inventoryCache?.[steamid as string],
      error: {...error, dynamoDBAccountFetchError: 'DYNAMO_DB_INVENTORY_FETCH_ERROR'},
      steamid: steamid as string,
      prices: cache.prices
    });

    return res.json(response);
  }
};

export default handler;
