import {CS2InventoryFetchErrorType, inventoryCacheType} from '@/pages/api/csgoInventory';
import {DynamoDBDocumentClient, GetCommand} from '@aws-sdk/lib-dynamodb';
import {calculateInventoryWithPrices} from '../../server-helpers';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {AWS_REGION, INVENTORY_TABLE} from './constants';
import {PriceType} from './types';
import {ENV} from './environment';

const {AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey} = ENV;

// TODO: Create class-service of AWS
const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
const docClient = DynamoDBDocumentClient.from(client);

type Props = {
  steamid: string;
  error?: CS2InventoryFetchErrorType;
  inventoryCache: inventoryCacheType;
  prices: Record<string, {price: PriceType}> | null;
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
  } catch (e) {
    const err = e as {$metadata?: {httpStatusCode?: number}};

    if (err?.$metadata?.httpStatusCode === 400) {
      return {statusCode: 404, inventory: '[]', error: 'NO_SUCH_RECORD_IN_DATABASE'};
    }

    return {statusCode: 205, inventory: '[]', error};
  }
};
