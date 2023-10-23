import {calculateInventoryWithPrices, getByTagName, getFormattedDate, isNumeric} from '@/api/helpers';
import {GetCommand, DynamoDBDocumentClient, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {INVENTORY_ERRORS, INVENTORY_TABLE, AWS_REGION, ONE_DAY} from '@/api/constants';
import {PriceCacheType, fetchPrices} from '@/api/fetch-prices';
import {InventoryGlobalType, SteamIDType} from '@/api/types';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {InventoryApi} from '@/api/inventory-api';
import {InventoryItemType} from '@/types';

const cache: PriceCacheType = {prices: null, lastUpdated: null};
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
const docClient = DynamoDBDocumentClient.from(client);
const createCommand = ({steamid}: SteamIDType) => new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

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
    const command = createCommand({steamid: storedSteamid as string});

    try {
      const {Item} = await docClient.send(command);
      const {update_time, inventory} = Item as {update_time: string; inventory: string};
      const withPrices = prices
        ? JSON.stringify(calculateInventoryWithPrices({inventory: JSON.parse(inventory), prices}))
        : inventory;

      return res.json({statusCode: 201, inventory: withPrices, update_time});
    } catch (e) {
      console.log(`${INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR}: ${e}`);

      return res.json({statusCode: 204, inventory: '[]', error: INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR});
    }
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
    const error: any = {steamAccountFetchError: e};
    console.log(`${INVENTORY_ERRORS.STEAM_INVENTORY_FETCH_ERROR}: ${e}`);

    if (e?.response.status === 404) {
      return res.status(404).json({statusCode: 404, inventory: '[]'});
    }

    if (e?.response.status === 403) {
      return res.status(403).json({statusCode: 403, inventory: '[]'});
    }

    try {
      const command = createCommand({steamid} as SteamIDType);
      const {Item} = await docClient.send(command);
      const {inventory, update_time} = Item as {update_time: string; inventory: string};

      if (inventory) {
        return res.json({
          statusCode: 201,
          update_time,
          inventory: prices
            ? JSON.stringify(calculateInventoryWithPrices({inventory: JSON.parse(inventory), prices}))
            : inventory
        });
      }
      return res.json({
        statusCode: 205,
        inventory: '[]',
        error: {...error, dynamoDBAccountFetchError: INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR}
      });
    } catch (e) {
      error.dynamoDBAccountFetchError = e;
      console.log(`${INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR}: ${e}`);
      return res.json({statusCode: 205, inventory: '[]', error});
    }
  }
};

export default handler;
