import {fetch} from '@/src/services/network';

interface FetchMock {
  get?: () => Promise<any>;
  post?: () => Promise<any>;
}

export const mock = ({get, post}: FetchMock): void => {
  if (get) {
    fetch.get = get;
  }
  if (post) {
    fetch.post = post;
  }
};

export const mockSuccessGet = (response: any): jest.Mock<Promise<any>, []> => {
  const get = jest.fn(() => Promise.resolve(response));
  mock({get});
  return get;
};

export const mockSuccessPost = (response: any): jest.Mock<Promise<any>, []> => {
  const post = jest.fn(() => Promise.resolve(response));
  mock({post});
  return post;
};
