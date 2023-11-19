import {getParamValuesArray} from '../get-param-values-array';
import {removeParamValue} from '../remove-param-value';
import {areEqualArrays} from '../are-equal-arrays';
import {isEmpty} from '../is-empty';
import {getAppliedFilterParams} from '../get-applied-filter-params';
import {getScreenSize} from '../get-screen-size';
import {ScreenSizes, screenSizes} from '../../constants';
import {paginate} from '../paginate';
import {InventoryItemType} from '@/src/services';
import {getImgSizes} from '../get-img-sizes';

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
  describe('getScreenSize', () => {
    it('returns ScreenSizes.Xxs when width is less than or equal to screenSizes.xxs', () => {
      const result = getScreenSize({width: screenSizes.xxs});
      expect(result).toEqual(ScreenSizes.Xxs);
    });
    it('returns ScreenSizes.Xs when width is less than or equal to screenSizes.xs', () => {
      const result = getScreenSize({width: screenSizes.xs - 1});
      expect(result).toEqual(ScreenSizes.Xs);
    });
    it('returns ScreenSizes.Sm when width is less than or equal to screenSizes.sm', () => {
      const result = getScreenSize({width: screenSizes.sm});
      expect(result).toEqual(ScreenSizes.Sm);
    });
    it('returns ScreenSizes.Md when width is less than or equal to screenSizes.md', () => {
      const result = getScreenSize({width: screenSizes.md});
      expect(result).toEqual(ScreenSizes.Md);
    });
    it('returns ScreenSizes.Lg when width is greater than screenSizes.md', () => {
      const result = getScreenSize({width: screenSizes.md + 1});
      expect(result).toEqual(ScreenSizes.Lg);
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
  describe('getImgSizes', () => {
    it('returns xs size when screenSize is ScreenSizes.Xs', () => {
      const result = getImgSizes({screenSize: ScreenSizes.Xs});
      expect(result).toEqual({width: 77, height: 60});
    });
    it('returns sm size when screenSize is ScreenSizes.Xxs', () => {
      const result = getImgSizes({screenSize: ScreenSizes.Xxs});
      expect(result).toEqual({width: 140, height: 108});
    });
    it('returns md size for any other screenSize', () => {
      const result = getImgSizes({screenSize: ScreenSizes.Md});
      expect(result).toEqual({width: 110, height: 82});
    });
  });
});
