import handler, {inventoryCache, pricesCache} from '../../pages/api/csgoInventory';
import {createMocks} from 'node-mocks-http';
import items from '../../mocks/items.json';
import {noop} from '@/src/services';

const sendMock = jest.fn();
const fetchDynamoMock = jest.fn();
const fetchPricesMock = jest.fn();
const getInventoryMock = jest.fn();
const updateDynamoMock = jest.fn();

jest.mock('@/src/services', () => ({
  awsServices: {
    sendFeedback: () => sendMock(),
    fetchFromDynamoDB: () => fetchDynamoMock(),
    updateDynamoInventoryRecord: () => updateDynamoMock()
  },
  inventoryApi: {get: () => getInventoryMock(), getProfile: jest.fn()},
  fetchPrices: () => fetchPricesMock()
}));

describe('api/csgoInventory', () => {
  const steamid = 'stmid';
  const cachedSteamid = 'dsdf';
  inventoryCache[cachedSteamid] = {};
  afterEach(() => {
    jest.resetAllMocks();
    pricesCache.prices = null;
  });
  describe('when no steamid', () => {
    it('should return 400 status', async () => {
      const {req, res} = createMocks({method: 'GET', query: {}});
      await handler(req, res);
      expect(res._getStatusCode()).toBe(400);
    });
  });
  describe('when no cached data', () => {
    it('should call fetchPrices', async () => {
      fetchDynamoMock.mockResolvedValueOnce({statusCode: 200});
      const {req, res} = createMocks({method: 'GET', query: {steamid}});
      await handler(req, res);
      expect(fetchPricesMock).toHaveBeenCalled();
    });
  });
  describe('when price is cached and updated less than 8 hours', () => {
    it('should not call fetchPrices', async () => {
      fetchDynamoMock.mockResolvedValueOnce({statusCode: 200});
      pricesCache.prices = {};
      pricesCache.lastUpdated = new Date();
      const {req, res} = createMocks({method: 'GET', query: {steamid}});
      await handler(req, res);
      expect(fetchPricesMock).not.toHaveBeenCalled();
    });
  });
  describe('when its not force update and have saved cache', () => {
    it('should return 201', async () => {
      fetchDynamoMock.mockResolvedValueOnce({statusCode: 200});
      const {req, res} = createMocks({method: 'GET', query: {steamid: cachedSteamid}});
      await handler(req, res);
      expect(res._getStatusCode()).toBe(201);
    });
  });
  describe('when its force update', () => {
    it('should call getInventory', async () => {
      fetchDynamoMock.mockResolvedValueOnce({statusCode: 200});
      jest.spyOn(console, 'error').mockImplementation(noop);
      const {req, res} = createMocks({method: 'GET', query: {steamid, isForceUpdate: true}});
      await handler(req, res);
      expect(getInventoryMock).toHaveBeenCalled();
    });
  });
  describe('when getInventory succeed', () => {
    it('should save inventory to dynamoDB', async () => {
      const statusCode = 200;
      fetchDynamoMock.mockResolvedValueOnce({statusCode});
      getInventoryMock.mockResolvedValueOnce(items);
      const {req, res} = createMocks({method: 'GET', query: {steamid, isForceUpdate: true}});
      await handler(req, res);
      expect(getInventoryMock).toHaveBeenCalled();
      expect(updateDynamoMock).toHaveBeenCalled();
      expect(res._getStatusCode()).toBe(statusCode);
    });
  });
  describe('when getInventory fails', () => {
    describe('with 404 code', () => {
      it('should return 404 status code', async () => {
        getInventoryMock.mockRejectedValueOnce({response: {status: 404}});
        const {req, res} = createMocks({method: 'GET', query: {steamid, isForceUpdate: true}});
        await handler(req, res);
        expect(res._getStatusCode()).toBe(404);
      });
    });
    describe('with 403 code', () => {
      it('should return 403 status code', async () => {
        getInventoryMock.mockRejectedValueOnce({response: {status: 403}});
        const {req, res} = createMocks({method: 'GET', query: {steamid, isForceUpdate: true}});
        await handler(req, res);
        expect(res._getStatusCode()).toBe(403);
      });
    });
    describe('when inventory is saved in cache', () => {
      it('should return 201 status', async () => {
        getInventoryMock.mockResolvedValueOnce(items);
        const {req, res} = createMocks({method: 'GET', query: {steamid: cachedSteamid, isForceUpdate: true}});
        await handler(req, res);
        expect(res._getStatusCode()).toBe(201);
      });
    });
  });
});
