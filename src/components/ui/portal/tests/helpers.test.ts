import {NOT_VISIBLE_OPACITY, VISIBLE_OPACITY, Z_INDEX_HIDDEN, Z_INDEX_MODAL} from '../constants';
import {calculateZindex, calculateOpacity, calculateTransform} from '../helpers';

describe('helpers', () => {
  describe('calculateTransform', () => {
    describe('when element is visible', () => {
      it('should return visible transform', () => {
        expect(calculateTransform({visible: true})).toBe('translateX(0px)');
      });
    });
    describe('when element is invisible', () => {
      it('should return hidden transform', () => {
        expect(calculateTransform({visible: false})).toBe('translateX(-1000px)');
      });
    });
  });
  describe('calculateOpacity', () => {
    describe('when element is visible', () => {
      it('should return visible opacity', () => {
        expect(calculateOpacity({visible: true})).toBe(VISIBLE_OPACITY);
      });
    });
    describe('when element is invisible', () => {
      it('should return invisible opacity', () => {
        expect(calculateOpacity({visible: false})).toBe(NOT_VISIBLE_OPACITY);
      });
    });
  });
  describe('calculateZindex', () => {
    describe('when element is visible', () => {
      it('should return visible zIndex', () => {
        expect(calculateZindex({visible: true})).toBe(Z_INDEX_MODAL);
      });
    });
    describe('when element is invisible', () => {
      it('should return invisible zIndex', () => {
        expect(calculateZindex({visible: false})).toBe(Z_INDEX_HIDDEN);
      });
    });
  });
});
