import {Descriptions, InventoryResponseType, ItemType} from '../types';
import {inventoryApi} from '../inventory';
import axios from 'axios';

jest.mock('axios');

describe('InventoryApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('get inventory', () => {
    describe('on request call', () => {
      it('should call with valid url', async () => {
        const mockData = {
          success: true,
          total_inventory_count: 5,
          assets: {},
          descriptions: {}
        };
        (axios.get as jest.Mock).mockResolvedValueOnce({data: mockData});
        await inventoryApi.get({steamid: '123'});
        expect(axios.get).toHaveBeenCalledWith(
          expect.stringContaining('http://steamcommunity.com/inventory/123/730/2?l=english&count=1000')
        );
      });
    });
    describe('when inventory is empty', () => {
      it('should return empty array', async () => {
        const mockData = {success: true, total_inventory_count: 0, assets: {}, descriptions: {}};
        (axios.get as jest.Mock).mockResolvedValueOnce({data: mockData});
        const result = await inventoryApi.get({steamid: '123'});

        expect(result).toEqual([]);
      });
    });
  });
  describe('parseItem', () => {
    describe('when parsing item', () => {
      it('should return modified item', async () => {
        const item = {
          id: '123',
          tradable: true,
          marketable: false,
          descriptions: [{classid: 'class1', instanceid: 'instance1'}]
        } as unknown as ItemType;
        const descriptions = [{classid: 'class1', instanceid: 'instance1'}] as Descriptions[];
        const result = inventoryApi.parseItem(item, descriptions);
        const expectedResult = {
          'assetid': '123',
          'descriptions': [{'classid': 'class1', 'instanceid': 'instance1'}],
          'id': '123',
          'marketable': false,
          'tradable': true
        };
        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe('parse', () => {
    it('should throw Error when failed', () => {
      expect(() => inventoryApi.parse(null as unknown as InventoryResponseType, true)).toThrow('Malformed response');
    });
    describe('when parsing items', () => {
      it('should parse correctly', () => {
        const mockData = {
          success: true,
          total_inventory_count: 1,
          assets: {'1': {classid: 'class1', assetid: 'instance1', tradable: true}},
          descriptions: [{classid: 'class1', name: 'Item 1'}]
        } as unknown as InventoryResponseType;
        const result = inventoryApi.parse(mockData, true);
        const expected = {classid: 'class1', name: 'Item 1', assetid: 'instance1', tradable: true, descriptions: []};
        expect(result).toEqual([expected]);
      });
    });
  });
});
