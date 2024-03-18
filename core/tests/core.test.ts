import {mockSuccessGet, mockSuccessPost} from '../../mocks/fetch';
import {fetchInventory} from '../fetch-inventory';
import {fetch} from '../../src/services/network';
import {postFeedback} from '../post-feedback';

describe('core requests', () => {
  describe('fetchInventory', () => {
    it('should call fetch.get function when call fetchInventory', async () => {
      const {signal} = new AbortController();
      const result = 'result';
      mockSuccessGet(result);
      const results = await fetchInventory({signal, steamid: {isSteamId64: true, value: 'id'}});
      expect(fetch.get).toHaveBeenCalledTimes(1);
      expect(results).toEqual(result);
    });
  });
  describe('postFeedback', () => {
    it('should call fetch.post function when call postFeedback', async () => {
      const {signal} = new AbortController();
      const result = 'result';
      mockSuccessPost(result);
      const results = await postFeedback({signal, body: {text: 'text', name: 'name'}});
      expect(fetch.post).toHaveBeenCalledTimes(1);
      expect(results).toEqual(result);
    });
  });
});
