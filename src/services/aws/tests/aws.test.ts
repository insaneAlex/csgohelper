/**
 * @jest-environment node
 */
import {UpdateCommand} from '@aws-sdk/lib-dynamodb';
import items from '../../../../mocks/items.json';
import {SESClient} from '@aws-sdk/client-ses';
import {awsConfig, AWSServices} from '../aws';
import {PricesType} from '../types';

const sendMock = jest.fn();

jest.mock('@aws-sdk/client-ses');
jest.mock('@aws-sdk/lib-dynamodb', () => ({
  ...jest.requireActual('@aws-sdk/lib-dynamodb'),
  DynamoDBDocumentClient: {from: () => ({send: () => sendMock()})},
  DynamoDBClient: jest.fn(),
  UpdateCommand: jest.fn(),
  GetCommand: jest.fn()
}));

const requestFailError = new Error('request fail');
const steamid = '3245234632463246';
const isSteamId64 = true;
describe('AWSServices', () => {
  let awsServices: AWSServices;
  beforeEach(() => {
    jest.clearAllMocks();
    awsServices = new AWSServices(awsConfig);
  });
  describe('sendFeedback', () => {
    describe('on success', () => {
      it('should send feedback email successfully', async () => {
        const mockSend = jest.fn();
        (SESClient.prototype.send as jest.Mock).mockImplementationOnce(mockSend);
        const feedbackData = {name: 'John', text: 'feedback message'};
        await awsServices.sendFeedback(feedbackData);
        expect(mockSend).toHaveBeenCalled();
      });
    });
    describe('on fail', () => {
      it('should send feedback email successfully', async () => {
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
        const mockSend = jest.fn().mockRejectedValueOnce(requestFailError);
        (SESClient.prototype.send as jest.Mock).mockImplementationOnce(mockSend);
        const feedbackData = {name: 'John', text: 'feedback message'};
        await awsServices.sendFeedback(feedbackData);
        expect(mockConsoleError).toHaveBeenCalledWith(requestFailError);
      });
    });
  });
  describe('updateDynamoInventoryRecord', () => {
    const update_time = '2023-11-17T12:00:00';
    const profile = {avatarfull: '', personaname: '', profileurl: ''};
    describe('on success', () => {
      it('should be called with command', async () => {
        sendMock.mockResolvedValue({$metadata: {httpStatusCode: 200}});
        const result = await awsServices.updateDynamoInventoryRecord(
          {steamid, steamId64: ''},
          isSteamId64,
          items,
          update_time,
          profile
        );
        expect(UpdateCommand).toHaveBeenCalledWith({
          Key: {steamid},
          TableName: 'inventories',
          UpdateExpression: 'SET inventory=:inventory, update_time=:update_time, profile=:profile',
          ExpressionAttributeValues: {
            ':inventory': JSON.stringify(items),
            ':update_time': update_time,
            ':profile': profile,
            ':customUrl': ''
          },
          ConditionExpression: 'inventory <> :inventory OR customUrl <> :customUrl'
        });
        expect(result).toEqual({isSaved: true});
      });
    });
    describe('on fail', () => {
      it('should return isSaved: false prop', async () => {
        sendMock.mockRejectedValueOnce(requestFailError);
        const result = await awsServices.updateDynamoInventoryRecord(
          {steamid, steamId64: ''},
          isSteamId64,
          items,
          update_time,
          profile
        );
        expect(UpdateCommand).toHaveBeenCalledWith({
          Key: {steamid},
          TableName: 'inventories',
          UpdateExpression: 'SET inventory=:inventory, update_time=:update_time, profile=:profile',
          ExpressionAttributeValues: {
            ':inventory': JSON.stringify(items),
            ':update_time': update_time,
            ':profile': profile,
            ':customUrl': ''
          },
          ConditionExpression: 'inventory <> :inventory OR customUrl <> :customUrl'
        });
        expect(result).toEqual({isSaved: false});
      });
    });
  });
  describe('fetchFromDynamoDB', () => {
    const inventoryCache = {};
    const prices = null;
    const responseItem = {update_time: '2023-11-17T12:00:00', inventory: '[]'};
    describe('on success and existed item', () => {
      it('should return Item', async () => {
        sendMock.mockResolvedValueOnce({Items: [responseItem]});
        const result = await awsServices.fetchFromDynamoDB(steamid, isSteamId64, inventoryCache, prices);
        expect(result).toEqual({
          statusCode: 201,
          shouldSaveSteamId: true,
          inventory: '[]',
          update_time: '2023-11-17T12:00:00'
        });
      });
    });
    describe('on success and not existed item', () => {
      it('should return with 404 error', async () => {
        sendMock.mockResolvedValueOnce({Items: null});
        const result = await awsServices.fetchFromDynamoDB(steamid, isSteamId64, inventoryCache, prices);
        expect(result).toEqual({statusCode: 404, inventory: '[]'});
      });
    });
    describe('on request fail', () => {
      it('should return with 404 error', async () => {
        sendMock.mockRejectedValueOnce(requestFailError);
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
        const result = await awsServices.fetchFromDynamoDB(steamid, isSteamId64, inventoryCache, prices);
        expect(mockConsoleError).toHaveBeenCalledWith(requestFailError);
        expect(result).toEqual({statusCode: 404, inventory: '[]'});
      });
    });
    describe('when price is avalable', () => {
      it('should return Item with price', async () => {
        const prices = {'qwe': {price: 'ITEM_PRICE'}} as unknown as PricesType;
        const itemValue = {market_hash_name: 'qwe'};
        const responseItem = {update_time: '2023-11-17T12:00:00', inventory: JSON.stringify([itemValue])};
        sendMock.mockResolvedValueOnce({Items: [responseItem]});
        const result = await awsServices.fetchFromDynamoDB(steamid, isSteamId64, inventoryCache, prices);
        const withPrices = JSON.stringify([{...itemValue, prices: prices?.[itemValue.market_hash_name]?.price}]);
        expect(result).toEqual({
          statusCode: 201,
          shouldSaveSteamId: true,
          inventory: withPrices,
          update_time: '2023-11-17T12:00:00'
        });
      });
    });
  });
});
