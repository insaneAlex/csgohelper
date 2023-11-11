import {DynamoDBDocumentClient, GetCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {NoPriceInventory, inventoryCacheType} from '@/pages/api/csgoInventory';
import {AWSConfigType, AmazonResponseType, PricesType} from './types';
import {calculateInventoryWithPrices} from '../../../server-helpers';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {AWS_REGION, INVENTORY_TABLE} from './constants';
import {FeedbackType} from '@/core/types';
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

  async fetchFromDynamoDB(steamid: string, inventoryCache: inventoryCacheType, prices: PricesType) {
    const command = new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

    try {
      const response = await this.docClient.send(command);

      if (response?.Item) {
        const {update_time, inventory} = response.Item as {update_time: string; inventory: string};
        inventoryCache[steamid] = {inventory, update_time};

        const withPrices = prices
          ? JSON.stringify(calculateInventoryWithPrices({inventory: JSON.parse(inventory), prices}))
          : inventory;

        return {statusCode: 201, shouldSaveSteamId: true, inventory: withPrices, update_time};
      }
      return {statusCode: 404, inventory: '[]'};
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return {statusCode: 404, inventory: '[]'};
    }
  }

  async updateDynamoInventoryRecord(steamid: string, inventory: NoPriceInventory, update_time: string) {
    const command = new UpdateCommand({
      Key: {steamid},
      TableName: INVENTORY_TABLE,
      UpdateExpression: 'SET inventory=:inventory, update_time=:update_time',
      ExpressionAttributeValues: {':inventory': JSON.stringify(inventory), ':update_time': update_time}
    });
    try {
      const response = (await this.docClient.send(command)) as AmazonResponseType;
      return {isSaved: response?.$metadata?.httpStatusCode === 200};
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      return {isSaved: false};
    }
  }

  async sendFeedback(data: FeedbackType) {
    const sendEmailCommand = new SendEmailCommand({
      Destination: {ToAddresses: [ENV.AWS_SES_EMAIL_TO]},
      Message: {Body: {Text: {Data: data.text}}, Subject: {Data: `New Feedback from ${data.name}!`}},
      Source: ENV.AWS_SES_EMAIL_FROM
    });
    try {
      await this.sesClient.send(sendEmailCommand);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

export const awsServices = new AWSServices(awsConfig);
