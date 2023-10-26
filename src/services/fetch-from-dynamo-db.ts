import {DynamoDBDocumentClient, GetCommand} from '@aws-sdk/lib-dynamodb';
import {calculateInventoryWithPrices} from '../../server-helpers';
import {inventoryCacheType} from '@/pages/api/csgoInventory';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {AWS_REGION, INVENTORY_TABLE} from './constants';
import {PriceType} from './types';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
const docClient = DynamoDBDocumentClient.from(client);
type Props = {
  error?: any;
  steamid: string;
  inventoryCache: inventoryCacheType;
  prices: {[key: string]: {price: PriceType}} | null;
};

export const fetchFromDynamoDB = async ({inventoryCache, error, steamid, prices}: Props) => {
  const command = new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

  try {
    const response = await docClient.send(command);

    if (response?.Item) {
      const {update_time, inventory} = response?.Item as {update_time: string; inventory: string};

      const withPrices = prices
        ? JSON.stringify(calculateInventoryWithPrices({inventory: JSON.parse(inventory), prices}))
        : inventory;

      inventoryCache.inventory = inventory;
      inventoryCache.update_time = update_time;

      return {statusCode: 201, inventory: withPrices, update_time};
    }

    throw error;
  } catch (e: any) {
    if (e?.$metadata?.httpStatusCode === 400) {
      return {statusCode: 404, inventory: '[]', error: 'NO_SUCH_RECORD_IN_DATABASE'};
    }

    return {statusCode: 205, inventory: '[]', error};
  }
};
