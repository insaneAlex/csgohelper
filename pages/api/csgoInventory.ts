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

const ONE_DAY = 24 * 60 * 60 * 1000;

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
    return res.json({statusCode: 404, inventory: '[]', error: 'NO_STEAMID_PROVIDED'});
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
    console.log(`STEAM_INVENTORY_FETCH_ERROR`);

    if (e?.response.status === 429) {
      error.steamAccountFetchError = SteamFetchErrors.TOO_MANY_REQUESTS;
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
      error: {...error, dynamoDBAccountFetchError: 'DYNAMO_DB_INVENTORY_FETCH_ERROR'},
      steamid: steamid as string
    });
  }
};

export default handler;
