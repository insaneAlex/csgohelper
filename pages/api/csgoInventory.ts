import {INVENTORY_ERRORS, INVENTORY_TABLE, AWS_REGION, ONE_DAY, STEAM_FETCH_ERRORS} from '@/api/constants';
import {calculateInventoryWithPrices, getByTagName, getFormattedDate, isNumeric} from '@/api/helpers';
import {PriceCacheType, fetchPrices} from '@/api/fetch-prices';
import {fetchFromDynamoDB} from '@/api/fetch-from-dynamo-db';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {InventoryApi} from '@/api/inventory-api';
import {InventoryGlobalType} from '@/api/types';
import {InventoryItemType} from '@/types';

const cache: PriceCacheType = {prices: null, lastUpdated: null};
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid, storedSteamid} = req.query;

  const now = new Date();
  const {prices, lastUpdated} = cache;

  if (!prices || !lastUpdated || now.getTime() - lastUpdated.getTime() > ONE_DAY) {
    await fetchPrices({cache});
  }

  if (!steamid && !storedSteamid) {
    return res.json({statusCode: 204, inventory: '[]', error: INVENTORY_ERRORS.NO_STEAMID_PROVIDED});
  }

  if (storedSteamid || !isNumeric(steamid as string)) {
    return await fetchFromDynamoDB({priceCache: cache, res, steamid: storedSteamid as string});
  }

  try {
    const {items}: {items: InventoryGlobalType[]} = await Object.create(InventoryApi).get({steamid});

    const minimizedInventory = items.map(({assetid, name, market_hash_name, name_color, icon_url, tags}) => {
      const exterior = getByTagName({tags, tagName: 'Exterior'}).localized_tag_name;
      const type = getByTagName({tags, tagName: 'Type'}).localized_tag_name;
      const rarity_color = getByTagName({tags, tagName: 'Rarity'}).color;

      return {type, name, assetid, exterior, icon_url, name_color, market_hash_name, rarity_color};
    }) as InventoryItemType[];

    const command = new UpdateCommand({
      Key: {steamid},
      TableName: INVENTORY_TABLE,
      UpdateExpression: 'SET inventory=:inventory, update_time=:update_time',
      ExpressionAttributeValues: {':inventory': JSON.stringify(minimizedInventory), ':update_time': getFormattedDate()}
    });

    const withPrices = prices
      ? calculateInventoryWithPrices({inventory: minimizedInventory, prices})
      : minimizedInventory;

    await client.send(command);
    return res.json({statusCode: 200, inventory: JSON.stringify(withPrices)});
  } catch (e: any) {
    const error: any = {};
    console.log(`${INVENTORY_ERRORS.STEAM_INVENTORY_FETCH_ERROR}: ${e}`);

    if (e?.response.status === 429) {
      error.steamAccountFetchError = STEAM_FETCH_ERRORS.TOO_MANY_REQUESTS;
    }

    if (e?.response.status === 404) {
      return res.status(404).json({statusCode: 404, inventory: '[]'});
    }

    if (e?.response.status === 403) {
      return res.status(403).json({statusCode: 403, inventory: '[]'});
    }

    return await fetchFromDynamoDB({
      priceCache: cache,
      res,
      error: {...error, dynamoDBAccountFetchError: INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR},
      steamid: steamid as string
    });
  }
};

export default handler;
