import {isFilterApplied} from '../is-filter-applied';

describe('helpers', () => {
  describe('isFilterApplied', () => {
    describe('when filters are array', () => {
      it('should return true if its applied', () => {
        const filters = ['fil1', 'fil2', 'fil3'];
        const filterToCheck = 'fil2';
        const result = isFilterApplied(filters, filterToCheck);

        expect(result).toBe(true);
      });
    });
    describe('if filters is string', () => {
      it('should return true if its applied', () => {
        const filters = 'fil2';
        const filterToCheck = 'fil2';

        expect(isFilterApplied(filters, filterToCheck)).toBe(true);
      });
    });
  });
});
