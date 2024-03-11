import {FeedbackType, InitialInventoryResponseType, SteamProfileType} from '@/core/types';
import {DynamoDBDocumentClient, GetCommand, UpdateCommand} from '@aws-sdk/lib-dynamodb';
import {NoPriceInventory, inventoryCacheType} from '@/pages/api/csgoInventory';
import {AWSConfigType, AmazonResponseType, PricesType} from './types';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {calculateInventoryWithPrices} from '@/server-helpers';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {AWS_REGION, INVENTORY_TABLE} from './constants';
import {ENV} from '../environment';
import {InvokeCommand, LambdaClient} from '@aws-sdk/client-lambda';
import {S3} from '@aws-sdk/client-s3';

export const awsConfig: AWSConfigType = {
  region: AWS_REGION,
  credentials: {accessKeyId: ENV.AWS_ACCESS_KEY_ID, secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY}
};

export class AWSServices {
  private docClient: DynamoDBDocumentClient;
  private sesClient: SESClient;
  private lambdaClient: LambdaClient;
  private s3Client: S3;

  constructor(config: AWSConfigType) {
    const dynamoClient = new DynamoDBClient(config);
    this.sesClient = new SESClient(config);
    this.docClient = DynamoDBDocumentClient.from(dynamoClient);
    this.lambdaClient = new LambdaClient(config);
    this.s3Client = new S3(config);
  }

  async fetchFromDynamoDB(steamid: string, inventoryCache: inventoryCacheType, prices: PricesType) {
    const command = new GetCommand({TableName: INVENTORY_TABLE, Key: {steamid}});

    try {
      const response = await this.docClient.send(command);

      if (response?.Item) {
        const {update_time, inventory, profile} = response.Item as InitialInventoryResponseType;
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
    steamid: string,
    inventory: NoPriceInventory,
    update_time: string,
    profile: SteamProfileType
  ) {
    const command = new UpdateCommand({
      Key: {steamid},
      TableName: INVENTORY_TABLE,
      UpdateExpression: 'SET inventory=:inventory, update_time=:update_time, profile=:profile',
      ExpressionAttributeValues: {
        ':inventory': JSON.stringify(inventory),
        ':update_time': update_time,
        ':profile': profile
      }
    });
    try {
      const response = (await this.docClient.send(command)) as AmazonResponseType;
      return {isSaved: response?.$metadata?.httpStatusCode === 200};
    } catch (e) {
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
      console.error(e);
    }
  }

  async invokeLambda(name: string, data: Record<string, unknown>) {
    const params = {
      FunctionName: name,
      Payload: JSON.stringify(data)
    };
    const command = new InvokeCommand(params);

    try {
      const response = await this.lambdaClient.send(command);
      const jsonString = new TextDecoder().decode(response.Payload);
      const jsonObject = JSON.parse(jsonString);

      return jsonObject;
    } catch (e) {
      console.error(e);
    }
  }

  async saveToBucket(prices: PricesType, lastUpdated: string) {
    const params = {
      Bucket: 'cs-prices',
      Key: 'prices.txt',
      Body: JSON.stringify({prices, lastUpdated}),
      ContentType: 'application/json'
    };

    this.s3Client.putObject(params, (err: unknown, data: unknown) => {
      if (err) {
        console.error('Error uploading data to S3:', err);
      } else {
        console.log('Data uploaded successfully:', data);
      }
    });
  }
}

export const awsServices = new AWSServices(awsConfig);
