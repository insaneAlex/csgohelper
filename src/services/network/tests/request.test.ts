import {bareRequest} from '../network';
import {fetch} from '../request';

jest.mock('../network');

describe('fetch functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('get function', () => {
    it('should make a GET request successfully', async () => {
      const responseData = {data: 'mocked data'};
      (bareRequest as jest.Mock).mockResolvedValueOnce(responseData);
      const result = await fetch.get('https://example.com');
      expect(bareRequest).toHaveBeenCalledWith('https://example.com', {headers: {'Content-Type': 'application/json'}});
      expect(result).toEqual(responseData);
    });
    it('should handle a failed GET request', async () => {
      const error = new Error('Request failed');
      (bareRequest as jest.Mock).mockRejectedValueOnce(error);
      await expect(fetch.get('https://example.com')).rejects.toThrow('Request failed');
    });
  });
  describe('post function', () => {
    it('should make a POST request successfully', async () => {
      const responseData = {data: 'mocked data'};
      const requestBody = {key: 'value'};
      (bareRequest as jest.Mock).mockResolvedValueOnce(responseData);
      const result = await fetch.post('https://example.com', requestBody);
      expect(bareRequest).toHaveBeenCalledWith('https://example.com', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
      });
      expect(result).toEqual(responseData);
    });
    it('should handle a failed POST request', async () => {
      const error = new Error('Request failed');
      const requestBody = {key: 'value'};
      (bareRequest as jest.Mock).mockRejectedValueOnce(error);
      await expect(fetch.post('https://example.com', requestBody)).rejects.toThrow('Request failed');
    });
  });
});
