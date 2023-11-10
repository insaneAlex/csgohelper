import {isEmpty} from '../is-empty';

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
