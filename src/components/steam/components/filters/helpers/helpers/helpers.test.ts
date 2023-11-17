import {calculateFilterValue} from '../calculate-filter-value';
import {isFilterApplied} from '../is-filter-applied';
import {ParsedUrlQuery} from 'querystring';

describe('helpers', () => {
  describe('isFilterApplied', () => {
    describe('when filters are array', () => {
      it('should return true if its applied', () => {
        const result = isFilterApplied(['fil1', 'fil2', 'fil3'], 'fil2');
        expect(result).toBe(true);
      });
    });
    describe('if filters is string', () => {
      it('should return true if its applied', () => {
        expect(isFilterApplied('fil2', 'fil2')).toBe(true);
      });
    });
  });
  describe('calculateFilterValue', () => {
    const emptyQuery = {};
    const TYPE = 'type';
    const PISTOL = 'Pistol';
    const RIFLE = 'Rifle';
    const KNIFE = 'Knife';
    const P250 = 'P250';
    const CZ = 'CZetka';
    const FIVE_SEVEN = 'Five-seven';
    const M4A1 = 'M4A1';
    const HUNTSMAN = 'Huntsman';
    describe('when applying one of all (>1) possible filters', () => {
      const possibleFilters = {[PISTOL]: [P250, FIVE_SEVEN]};
      it('should return "filterName" filter with value', () => {
        const result = calculateFilterValue(PISTOL, P250, emptyQuery, possibleFilters);
        const expectedValue = {[PISTOL]: [P250]};
        expect(result).toEqual(expectedValue);
      });
    });
    describe('when applying all of possible subfilters', () => {
      const query: ParsedUrlQuery = {[PISTOL]: [P250]};
      const possibleFilters = {[PISTOL]: [P250, FIVE_SEVEN]};
      it('should return "type" filter with "filterName" value', () => {
        const result = calculateFilterValue(PISTOL, FIVE_SEVEN, query, possibleFilters);
        const expectedValue = {[PISTOL]: [], [TYPE]: [PISTOL]};
        expect(result).toEqual(expectedValue);
      });
    });
    describe('when "type" filter is applied and removing its subfilter', () => {
      const query: ParsedUrlQuery = {[TYPE]: [PISTOL]};
      const possibleFilters = {[PISTOL]: [P250, FIVE_SEVEN, CZ]};
      it('should return remove "type" values and apply all subfilters without deleted', () => {
        const result = calculateFilterValue(PISTOL, FIVE_SEVEN, query, possibleFilters);
        const expectedValue = {[PISTOL]: [P250, CZ], [TYPE]: []};
        expect(result).toEqual(expectedValue);
      });
    });
    describe('when "type" filter is applied and removing its value', () => {
      const query: ParsedUrlQuery = {[TYPE]: [PISTOL, RIFLE]};
      const possibleFilters = {[PISTOL]: [P250, FIVE_SEVEN, CZ], [RIFLE]: [M4A1]};
      it('should return "type" values without deleted', () => {
        const result = calculateFilterValue(TYPE, PISTOL, query, possibleFilters);
        const expectedValue = {[TYPE]: [RIFLE]};
        expect(result).toEqual(expectedValue);
      });
    });
    describe('when removing "type" filter', () => {
      const query: ParsedUrlQuery = {[TYPE]: [PISTOL], [PISTOL]: [P250]};
      const possibleFilters = {[PISTOL]: [P250], [KNIFE]: [HUNTSMAN]};
      it('should remove this filter subfilters', () => {
        const result = calculateFilterValue(TYPE, PISTOL, query, possibleFilters);
        const expectedValue = {[TYPE]: []};
        expect(result).toEqual(expectedValue);
      });
    });
    describe('when removing "type" filter', () => {
      const possibleFilters = {[PISTOL]: [P250], [KNIFE]: [HUNTSMAN]};
      it('should remove this filter subfilters', () => {
        const result = calculateFilterValue(TYPE, PISTOL, emptyQuery, possibleFilters);
        const expectedValue = {[TYPE]: [PISTOL], [PISTOL]: []};
        expect(result).toEqual(expectedValue);
      });
    });
  });
});
