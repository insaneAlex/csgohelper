import {getParamValuesArray} from '../get-param-values-array';
import {removeParamValue} from '../remove-param-value';
import {areEqualArrays} from '../are-equal-arrays';
import {isEmpty} from '../is-empty';

describe('helpers', () => {
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
});
