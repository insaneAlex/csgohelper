import {noop} from '../noop';

describe('noop', () => {
  it('should do nothing', () => {
    const result = noop();
    expect(result).toBeUndefined();
  });
});
