import {calculateZindex, calculateOpacity, calculateTransform} from '../helpers';
import styles from 'styles/export.module.scss';

describe('helpers', () => {
  describe('calculateTransform', () => {
    describe('when element is visible', () => {
      it('should return visible transform', () => {
        expect(calculateTransform({visible: true})).toBe(styles.translateXShow);
      });
    });
    describe('when element is invisible', () => {
      it('should return hidden transform', () => {
        expect(calculateTransform({visible: false})).toBe(styles.translateXHide);
      });
    });
  });
  describe('calculateOpacity', () => {
    describe('when element is visible', () => {
      it('should return visible opacity', () => {
        expect(calculateOpacity({visible: true})).toBe(styles.fullOpacity);
      });
    });
    describe('when element is invisible', () => {
      it('should return invisible opacity', () => {
        expect(calculateOpacity({visible: false})).toBe(styles.noOpacity);
      });
    });
  });
  describe('calculateZindex', () => {
    describe('when element is visible', () => {
      it('should return visible zIndex', () => {
        expect(calculateZindex({visible: true})).toBe(styles.zIndexModal);
      });
    });
    describe('when element is invisible', () => {
      it('should return invisible zIndex', () => {
        expect(calculateZindex({visible: false})).toBe(styles.zIndexHidden);
      });
    });
  });
});
