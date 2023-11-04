import {CS2InventoryFetchErrorType, inventoryCacheType} from '@/pages/api/csgoInventory';
import {DynamoDBDocumentClient, GetCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {calculateInventoryWithPrices} from '../../../server-helpers';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {AWS_REGION, INVENTORY_TABLE} from './constants';
import {FeedbackType} from '@/core/types';
import {InventoryItemType} from '@/types';
import {AWSConfigType} from './types';
import {PriceType} from '../types';
import {ENV} from '../environment';

const awsConfig: AWSConfigType = {
  region: AWS_REGION,
  credentials: {accessKeyId: ENV.AWS_ACCESS_KEY_ID, secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY}
};

class AWSServices {
  private docClient: DynamoDBDocumentClient;
  private sesClient: SESClient;

  constructor(config: AWSConfigType) {
    const dynamoClient = new DynamoDBClient(config);
    this.sesClient = new SESClient(config);
    this.docClient = DynamoDBDocumentClient.from(dynamoClient);
  }

  async fetchFromDynamoDB(
    steamid: string,
    inventoryCache: inventoryCacheType,
    prices: Record<string, {price: PriceType}> | null,
    error?: CS2InventoryFetchErrorType
  ) {
    const command = new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

    try {
      const response = await this.docClient.send(command);

      if (response?.Item) {
        const {update_time, inventory} = response.Item as {update_time: string; inventory: string};

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
  }

  async updateDynamoInventoryRecord(steamid: string, inventory: InventoryItemType[], update_time: string) {
    const command = new UpdateCommand({
      Key: {steamid},
      TableName: INVENTORY_TABLE,
      UpdateExpression: 'SET inventory=:inventory, update_time=:update_time',
      ExpressionAttributeValues: {':inventory': JSON.stringify(inventory), ':update_time': update_time}
    });

    await this.docClient.send(command);
  }

  async sendFeedback(data: FeedbackType) {
    const sendEmailCommand = new SendEmailCommand({
      Destination: {ToAddresses: [ENV.AWS_SES_EMAIL_TO]},
      Message: {Body: {Text: {Data: data.text}}, Subject: {Data: `New Feedback from ${data.name}!`}},
      Source: ENV.AWS_SES_EMAIL_FROM
    });

    await this.sesClient.send(sendEmailCommand);
  }
}

export const awsServices = new AWSServices(awsConfig);
