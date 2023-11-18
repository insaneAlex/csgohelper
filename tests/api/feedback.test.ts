import handler from '.,/../../pages/api/feedback';
import {createMocks} from 'node-mocks-http';

const sendMock = jest.fn();

jest.mock('../../src/services', () => ({awsServices: {sendFeedback: () => sendMock()}}));

describe('api/feedback', () => {
  describe('when not post request', () => {
    it('should return 400 response', async () => {
      const {req, res} = createMocks({method: 'GET', body: {text: 'qwe', name: 'nam'}});
      await handler(req, res);
      expect(res._getStatusCode()).toBe(400);
    });
  });
  describe('when post request', () => {
    it('should return 200 response', async () => {
      const {req, res} = createMocks({method: 'POST', body: {text: 'qwe', name: 'nam'}});
      await handler(req, res);
      expect(res._getStatusCode()).toBe(200);
    });
  });
  describe('when failed request', () => {
    it('should return 401 response', async () => {
      sendMock.mockRejectedValueOnce({});
      const {req, res} = createMocks({method: 'POST', body: {text: 'qwe', name: 'nam'}});
      await handler(req, res);
      expect(res._getStatusCode()).toBe(401);
    });
  });
});
