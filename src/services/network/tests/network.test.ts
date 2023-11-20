import {bareRequest, createUrl} from '../network';

describe('network', () => {
  describe('createUrl', () => {
    it("shouldn' change url if params are empty", () => {
      const url = 'example.com';
      const urlWithParams = createUrl(url, {});
      const urlWithoutParam = createUrl(url);
      expect(urlWithParams).toEqual(url);
      expect(urlWithoutParam).toEqual(url);
    });
    it('should create url with parameters if url already has them', () => {
      const url = 'example.com?query=0';
      const params = {param1: '1', param2: '2'};
      const urlWithParams = createUrl(url, params);
      const expectedResult = 'example.com?query=0&param1=1&param2=2';
      expect(urlWithParams).toEqual(expectedResult);
    });
    it('should create url with get parameters explicitly with 0', () => {
      const url = 'example.com';
      const params = {query: 'val'};
      const urlWithParams = createUrl(url, params);
      const expectedResult = 'example.com?query=val';
      expect(urlWithParams).toEqual(expectedResult);
    });
    it('should create url with array parameters', () => {
      const url = 'example.com';
      const params = {query: ['val', 'val2']};
      const urlWithParams = createUrl(url, params);
      const expectedResult = 'example.com?query=val&query=val2';
      expect(urlWithParams).toEqual(expectedResult);
    });
  });
  describe('bareRequest', () => {
    (global as any).fetch = jest.fn();
    it('should make a request successfully', async () => {
      (global as any).fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({data: 'mocked data'})
      });
      const response = await bareRequest('https://example.com');
      expect(response.data).toBe('mocked data');
      expect(response.status).toBe(200);
    });
    it('should handle a failed request', async () => {
      (global as any).fetch.mockResolvedValueOnce({ok: false, status: 404});
      await expect(bareRequest('https://example.com')).rejects.toThrow('Request failed with status 404');
    });
  });
});
