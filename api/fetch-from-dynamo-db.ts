import {AWS_REGION, INVENTORY_ERRORS, INVENTORY_TABLE} from './constants';
import {DynamoDBDocumentClient, GetCommand} from '@aws-sdk/lib-dynamodb';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {calculateInventoryWithPrices} from './helpers';
import {PriceCacheType} from './fetch-prices';
import {NextApiResponse} from 'next';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const client = new DynamoDBClient({region: AWS_REGION, credentials: {accessKeyId, secretAccessKey}});
const docClient = DynamoDBDocumentClient.from(client);
type Props = {error?: any; steamid: string; res: NextApiResponse; priceCache: PriceCacheType};

export const fetchFromDynamoDB = async ({res, error, steamid, priceCache}: Props) => {
  const command = new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

  try {
    const response = await docClient.send(command);

    if (response?.Item) {
      const {update_time, inventory} = response?.Item as {update_time?: string; inventory: string};
      const withPrices = priceCache.prices
        ? JSON.stringify(calculateInventoryWithPrices({inventory: JSON.parse(inventory), prices: priceCache.prices}))
        : inventory;

      return res.json({statusCode: 201, inventory: withPrices, update_time});
    }

    throw error;
  } catch (e: any) {
    if (e?.$metadata?.httpStatusCode === 400) {
      return res.json({statusCode: 404, inventory: '[]', error: 'NO_SUCH_RECORD_IN_DATABASE'});
    }
    console.log(`${INVENTORY_ERRORS.DYNAMO_DB_INVENTORY_FETCH_ERROR}: ${e}`);

    return res.json({statusCode: 205, inventory: '[]', error});
  }
};
