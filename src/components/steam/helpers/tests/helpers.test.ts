import {isEmpty} from '../is-empty';
import {areEqualArrays} from '../are-equal-arrays';

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
});
