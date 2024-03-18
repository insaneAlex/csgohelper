import {AWSConfigType, AmazonResponseType, InventoryCacheType, NoPriceInventory, PricesType} from './types';
import {FeedbackType, InitialInventoryResponseType, SteamProfileType} from '@/core/types';
import {DynamoDBDocumentClient, QueryCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {calculateInventoryWithPrices} from '@/server-helpers';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {ENV} from '../environment';
import {
  RECORD_ALREADY_SAVED_EXCEPTION,
  CUSTOM_URL_INDEX,
  INVENTORY_TABLE,
  AWS_REGION,
  CUSTOM_URL,
  STEAM_ID
} from './constants';

export const awsConfig: AWSConfigType = {
  region: AWS_REGION,
  credentials: {accessKeyId: ENV.AWS_ACCESS_KEY_ID, secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY}
};

export class AWSServices {
  private docClient: DynamoDBDocumentClient;
  private sesClient: SESClient;

  constructor(config: AWSConfigType) {
    const dynamoClient = new DynamoDBClient(config);
    this.sesClient = new SESClient(config);
    this.docClient = DynamoDBDocumentClient.from(dynamoClient);
  }

  async fetchFromDynamoDB(
    steamid: string,
    isSteamId64: boolean,
    inventoryCache: InventoryCacheType,
    prices: PricesType
  ) {
    const id = isSteamId64 ? STEAM_ID : CUSTOM_URL;

    const command = new QueryCommand({
      TableName: INVENTORY_TABLE,
      KeyConditionExpression: `${id} = :${id}`,
      ExpressionAttributeValues: {[`:${id}`]: steamid},
      ...(isSteamId64 ? {} : {IndexName: CUSTOM_URL_INDEX})
    });

    try {
      const response = await this.docClient.send(command);
      const item = response?.Items?.[0] as InitialInventoryResponseType;

      if (item) {
        const {update_time, inventory, profile} = item;
        const inventoryItems = JSON.parse(inventory);
        inventoryCache[steamid] = {inventory: inventoryItems, update_time, profile};
        const withPrices = JSON.stringify(calculateInventoryWithPrices(inventoryItems, prices));

        return {statusCode: 201, shouldSaveSteamId: true, inventory: withPrices, profile, update_time};
      }
      return {statusCode: 404, inventory: '[]'};
    } catch (e) {
      console.error(e);
      return {statusCode: 404, inventory: '[]'};
    }
  }

  async updateDynamoInventoryRecord(
    steamIdentificator: {steamid: string; steamId64: string},
    isSteamId64: boolean,
    inventory: NoPriceInventory,
    update_time: string,
    profile: SteamProfileType
  ) {
    const {steamid, steamId64} = steamIdentificator;
    const UPDATE_EXPRESSION = 'SET inventory=:inventory, update_time=:update_time, profile=:profile';

    const command = new UpdateCommand({
      Key: {steamid: isSteamId64 ? steamid : steamId64},
      TableName: INVENTORY_TABLE,
      ConditionExpression: 'inventory <> :inventory',
      UpdateExpression: isSteamId64 ? UPDATE_EXPRESSION : UPDATE_EXPRESSION + ', customUrl=:customUrl',
      ExpressionAttributeValues: {
        ':inventory': JSON.stringify(inventory),
        ':update_time': update_time,
        ':profile': profile,
        ...(!isSteamId64 ? {':customUrl': steamid} : {})
      }
    });
    try {
      const response = (await this.docClient.send(command)) as AmazonResponseType;
      return {isSaved: response?.$metadata?.httpStatusCode === 200};
    } catch (e) {
      console.error(e);
      const isUpToDate = (e as {name: string})?.name === RECORD_ALREADY_SAVED_EXCEPTION;
      return {isSaved: isUpToDate};
    }
  }

  async sendFeedback({text, name}: FeedbackType) {
    const sendEmailCommand = new SendEmailCommand({
      Destination: {ToAddresses: [ENV.AWS_SES_EMAIL_TO]},
      Message: {Body: {Text: {Data: text}}, Subject: {Data: `New Feedback from ${name}!`}},
      Source: ENV.AWS_SES_EMAIL_FROM
    });
    try {
      await this.sesClient.send(sendEmailCommand);
    } catch (e) {
      console.error(e);
    }
  }
}

export const awsServices = new AWSServices(awsConfig);
