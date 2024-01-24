import {calculateInventoryPrice} from '../calculate-inventory-price';
import {getAppliedFilterParams} from '../get-applied-filter-params';
import {DUPLICATES_PARAM, SORT, SortTypes} from '../../components';
import {getParamValuesArray} from '../get-param-values-array';
import {removeParamValue} from '../remove-param-value';
import items from '../../../../../mocks/items.json';
import {areEqualArrays} from '../are-equal-arrays';
import {modifyInventory} from '../modify-inventory';
import {getUniqueItems} from '../get-unique-items';
import {InventoryItemType} from '@/src/services';
import {PriceOptions} from '../../types';
import {sortItems} from '../sort-items';
import {paginate} from '../paginate';
import {isEmpty} from '../is-empty';

jest.mock('../../../../services', () => ({}));
describe('helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('isEmpty', () => {
    describe('if argument have only spaces', () => {
      it('should return true', () => {
        const test = '   ';
        expect(isEmpty(test)).toBeTruthy();
      });
    });
    describe('if argument is undefined or null', () => {
      it('should return true', () => {
        expect(isEmpty(undefined)).toBeTruthy();
      });
    });
    describe('if argument is valid string', () => {
      it('should return false', () => {
        const test = 'test';
        expect(isEmpty(test)).toBeFalsy();
      });
    });
    describe('if argument is not string', () => {
      it('should return false', () => {
        expect(isEmpty([] as unknown as string)).toBeTruthy();
      });
    });
  });
  describe('areEqualArrays', () => {
    describe('arrays are equal', () => {
      it('should return true', () => {
        const arr1 = ['val2', 'val1'];
        const arr2 = ['val1', 'val2'];
        expect(areEqualArrays(arr1, arr2)).toBeTruthy();
      });
    });
    describe('have different lengths', () => {
      const arr1 = ['val1'];
      const arr2 = ['val1', 'val2'];
      it('should return false', () => {
        expect(areEqualArrays(arr1, arr2)).toBeFalsy();
      });
    });
    describe("arrays aren't equal", () => {
      const arr1 = ['val1', 'val1'];
      const arr2 = ['val1', 'val2'];
      it('should return false', () => {
        expect(areEqualArrays(arr1, arr2)).toBeFalsy();
      });
    });
  });
  describe('getParamValuesArray', () => {
    describe('if param value is Array', () => {
      it('should return array', () => {
        const param = 'param1';
        const params = {[param]: ['val1', 'val2', 'val3']};
        expect(getParamValuesArray(params, param)).toBe(params[param]);
      });
    });
    describe('if param value is string', () => {
      it('should return array', () => {
        const val1 = 'val1';
        const param = 'param1';
        const params = {[param]: val1};
        expect(getParamValuesArray(params, param)).toEqual([val1]);
      });
    });
    describe('if param doesnt exist in params', () => {
      it('should return empty array', () => {
        const params = {param1: 'val1'};
        expect(getParamValuesArray(params, 'param2')).toEqual([]);
      });
    });
  });
  describe('removeParamValue', () => {
    describe('when array received', () => {
      it('should return without filtered value', () => {
        const filteredValue = 'val2';
        const expectedResult = ['val1', 'val3'];
        const params = ['val1', 'val2', 'val3'];
        expect(removeParamValue(params, filteredValue)).toEqual(expectedResult);
      });
    });
  });
  describe('getAppliedFilterParams', () => {
    it('returns empty object for empty parameters', () => {
      const possibleFilters = {};
      const params = {};
      const result = getAppliedFilterParams(possibleFilters, params);
      expect(result).toEqual({});
    });
    it('filters and removes not possible filters', () => {
      const possibleFilters = {Rifle: ['a', 'b', 'c']};
      const params = {Rifle: ['a', 'd']};
      const expected = {Rifle: ['a']};
      const result = getAppliedFilterParams(possibleFilters, params);
      expect(result).toEqual(expected);
    });
    it('filters and removes not possible filters', () => {
      const possibleFilters = {Rifle: ['a', 'b', 'c'], Pistol: ['a', 'b']};
      const params = {Rifle: ['a', 'd'], type: ['Pistol']};
      const expected = {Rifle: ['a'], types: ['Pistol']};
      const result = getAppliedFilterParams(possibleFilters, params);
      expect(result).toEqual(expected);
    });
  });
  describe('paginate', () => {
    const generateItems = (count: number) => {
      return Array.from({length: count}, (_, index) => ({id: index.toString()}));
    };
    it('returns original items when pageSize is greater than items length', () => {
      const items = generateItems(5) as unknown as InventoryItemType[];
      const result = paginate({items, pageNumber: 1, pageSize: 10});
      expect(result).toEqual(items);
    });
    it('returns the correct page of items when pageSize is less than or equal to items length', () => {
      const items = generateItems(15) as unknown as InventoryItemType[];
      const pageSize = 5;
      const pageNumber = 2;
      const result = paginate({items, pageNumber, pageSize});
      const expectedItems = items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      expect(result).toEqual(expectedItems);
    });
  });
  describe('calculateInventoryPrice', () => {
    it('should calculate inventory price', () => {
      const expected = '3.00';
      expect(calculateInventoryPrice({items: items as unknown as InventoryItemType[]})).toBe(expected);
    });
    describe('when inventory price is zero', () => {
      it('should return empty string', () => {
        expect(calculateInventoryPrice({items: [{}, {}] as unknown as InventoryItemType[]})).toBe('');
      });
    });
  });
  describe('getUniqueItems', () => {
    it('returns an array of unique items with count', () => {
      const inputInventory = [{name: 'item1'}, {name: 'item1'}, {name: 'item3'}] as InventoryItemType[];
      const expectedResult = [
        {name: 'item1', count: 2},
        {name: 'item3', count: 1}
      ];
      const result = getUniqueItems({inventory: inputInventory});
      expect(result).toEqual(expectedResult);
    });
    it('handles an inventory with a single item', () => {
      const inputInventory = [{name: 'item1'}] as InventoryItemType[];
      const expectedResult = [{name: 'item1', count: 1}];
      const result = getUniqueItems({inventory: inputInventory});
      expect(result).toEqual(expectedResult);
    });
  });
  describe('modifyInventory', () => {
    const query = {};
    const filters = {};
    const inventoryItems = [
      {name: 'item1', type: 'awp'},
      {name: 'item2'},
      {name: 'item2'}
    ] as unknown as InventoryItemType[];
    it('returns the original inventory when no filters or query parameters are provided', () => {
      expect(modifyInventory({filters, query, inventoryItems})).toEqual(inventoryItems);
    });
    it('applies filters to the inventory when filters are provided', () => {
      const filters = {types: ['awp']};
      expect(modifyInventory({filters, query, inventoryItems})).toEqual([inventoryItems[0]]);
    });
    it('removes duplicates from the inventory when query parameter DUPLICATES_PARAM is set to "false"', () => {
      const query = {[DUPLICATES_PARAM]: 'false'};
      const result = modifyInventory({filters, query, inventoryItems});
      expect(result).toEqual([
        {name: 'item1', type: 'awp', count: 1},
        {name: 'item2', count: 2}
      ]);
    });
  });
  describe('sortItems', () => {
    const mockItems = [
      {prices: {[PriceOptions.DAY]: {average: 2}}, count: 1},
      {prices: {[PriceOptions.DAY]: {average: 1}}, count: 1}
    ] as InventoryItemType[];
    it('should sort items by low price when SortTypes.LowPrice is passed', () => {
      const sortedItems = sortItems({items: mockItems, sortType: SortTypes.LowPrice});
      const expected = [
        {prices: {[PriceOptions.DAY]: {average: 1}}, count: 1},
        {prices: {[PriceOptions.DAY]: {average: 2}}, count: 1}
      ];
      expect(sortedItems).toEqual(expected);
    });
    it('should sort items by high price when SortTypes.HighPrice is passed', () => {
      const sortedItems = sortItems({items: mockItems, sortType: SortTypes.HighPrice});
      const expected = [
        {prices: {[PriceOptions.DAY]: {average: 2}}, count: 1},
        {prices: {[PriceOptions.DAY]: {average: 1}}, count: 1}
      ];
      expect(sortedItems).toEqual(expected);
    });
    it('should push items with undefined or NaN prices to end', () => {
      const itemsMock = [{prices: undefined}, {prices: {[PriceOptions.DAY]: {average: 1}}}] as InventoryItemType[];
      const expected = [{prices: {[PriceOptions.DAY]: {average: 1}}}, {prices: undefined}];
      const sortedItems = sortItems({items: itemsMock, sortType: SortTypes.LowPrice});
      expect(sortedItems).toEqual(expected);
    });
  });
  describe('modifyInventory', () => {
    const mockItems = [{prices: undefined}, {prices: {[PriceOptions.DAY]: {average: 1}}}] as InventoryItemType[];
    describe('when should sort', () => {
      it('should return sorted inventory', () => {
        const sortedItems = modifyInventory({
          inventoryItems: mockItems,
          filters: {},
          query: {[SORT]: SortTypes.HighPrice}
        });
        const expected = [{prices: {[PriceOptions.DAY]: {average: 1}}}, {prices: undefined}];
        expect(sortedItems).toEqual(expected);
      });
    });
  });
});
