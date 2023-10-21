import {INVENTORY_ERRORS, INVENTORY_TABLE, PRICES_API_URL, AWS_REGION, ONE_DAY} from '@/api/constants';
import {calculateInventoryWithPrices, getByTagName, getFormattedDate, isNumeric} from '@/api/helpers';
import {GetCommand, DynamoDBDocumentClient, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {InventoryGlobalType, PriceType, SteamIDType} from '@/api/types';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {InventoryApi} from '@/api/inventory-api';
import {InventoryItemType} from '@/types';
import axios from 'axios';

type CacheType = {prices: {[key: string]: {price: PriceType}} | null; lastUpdated: Date | null};

const cache: CacheType = {prices: null, lastUpdated: null};
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
const docClient = DynamoDBDocumentClient.from(client);

const createCommand = ({steamid}: SteamIDType) => new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

const getCSGOInventory = async ({steamid}: SteamIDType) => {
  const inventoryApi = Object.create(InventoryApi);
  const {items} = await inventoryApi.get({appid: 730, contextid: 2, steamid, tradable: false});
  return items as InventoryGlobalType[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const steamid = req.query.steamid as string;
  const steamId = req.query.steamId as string;

  const now = new Date();

  if (
    !cache.prices ||
    !cache.lastUpdated ||
    (now as unknown as number) - (cache.lastUpdated as unknown as number) > ONE_DAY
  ) {
    try {
      const pricesResp = await axios.get(PRICES_API_URL);
      cache.prices = pricesResp?.data?.items_list;
      cache.lastUpdated = new Date();
    } catch (e) {
      console.log(`${INVENTORY_ERRORS.PRICES_API_FETCH_ERROR} : ${e}`);
    }
  }

  const {prices} = cache;

  if (!steamid && !steamId) {
    return res.json({statusCode: 204, inventory: [], description: INVENTORY_ERRORS.NO_STEAMID_PROVIDED});
  }

  if (steamId || !isNumeric(steamid)) {
    const command = createCommand({steamid: steamId});

    try {
      const {Item} = (await docClient.send(command)) as unknown as {Item: {update_time: string; inventory: string}};
      const {update_time, inventory} = Item;
      const newInventory = prices
        ? JSON.stringify(
            JSON.parse(inventory).map((item: any) => ({...item, prices: prices[item.market_hash_name]?.price}))
          )
        : inventory;

      return res.json({statusCode: 201, inventory: newInventory, update_time});
    } catch (e) {
      console.log(`${INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR}: ${e}`);

      return res.json({statusCode: 204, inventory: [], description: INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR});
    }
  }

  try {
    const inventory = await getCSGOInventory({steamid});

    const updatedInventory = inventory.map(({assetid, name, market_hash_name, name_color, icon_url, tags}) => {
      const exterior = getByTagName({tags, tagName: 'Exterior'}).localized_tag_name;
      const type = getByTagName({tags, tagName: 'Type'}).localized_tag_name;
      const rarity_color = getByTagName({tags, tagName: 'Rarity'}).color;

      return {type, name, assetid, exterior, icon_url, name_color, market_hash_name, rarity_color};
    }) as InventoryItemType[];

    const command = new UpdateCommand({
      Key: {steamid},
      TableName: INVENTORY_TABLE,
      UpdateExpression: 'SET inventory=:inventory, update_time=:update_time',
      ExpressionAttributeValues: {':inventory': JSON.stringify(updatedInventory), ':update_time': getFormattedDate()}
    });

    const modifiedInventory = calculateInventoryWithPrices({inventory: updatedInventory, prices});
    await client.send(command);
    return res.status(200).json({statusCode: 200, inventory: JSON.stringify(modifiedInventory)});
  } catch (e) {
    console.log(`${INVENTORY_ERRORS.STEAM_INVENTORY_FETCH_ERROR}: ${e}`);

    const command = createCommand({steamid});
    try {
      const response = await docClient.send(command);
      if (response.Item?.inventory) {
        const inventory = JSON.parse(response.Item.inventory);
        const update_time = response.Item.update_time || '';
        const withPrices = calculateInventoryWithPrices({inventory, prices});

        return res.json({statusCode: 201, update_time, inventory: JSON.stringify(withPrices)});
      }
      return res.status(400).json({inventory: [], description: INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR});
    } catch (e) {
      console.log(`${INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR}: ${e}`);
      return res.json({statusCode: 204, inventory: [], description: INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR});
    }
  }
};

export default handler;
