import {InventoryGlobalType} from './types';
import axios, {AxiosResponse} from 'axios';
import {parseItem} from './helpers';

type InventoryResult = {
  items: InventoryGlobalType[];
  total: number;
};

type GetInventoryParams = {
  appid: string;
  contextid: string;
  steamid: string;
  start: string;
  result: InventoryResult;
  count?: number;
  retries?: number;
  retryDelay?: number;
  language?: string;
  tradable?: boolean;
  retryFn?: (result: InventoryResult) => boolean;
};

export const InventoryApi = {
  recentRotations: 0,
  maxUse: 5,
  recentRequests: 0,

  get({
    appid,
    contextid,
    steamid,
    start,
    result,
    count = 1000,
    retries = 1,
    retryDelay = 100,
    language = 'english',
    tradable = true,
    retryFn = () => true
  }: GetInventoryParams): Promise<InventoryResult> {
    if (this.recentRotations >= this.maxUse) {
      return Promise.reject(new Error('Too many requests'));
    }

    const url = `http://steamcommunity.com/inventory/${steamid}/${appid}/${contextid}?l=${language}&count=${count}`;

    this.recentRequests += 1;

    const makeRequest = async (): Promise<void> => {
      try {
        const res: AxiosResponse = await axios.get(url);
        const {data} = res;
        result = this.parse(data, result, contextid, tradable);
      } catch (err) {
        if (retries > 1) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return makeRequest();
        }
        throw err;
      }
    };

    return makeRequest()
      .then(() => {
        if (result.items.length < result.total && retryFn(result)) {
          start = result.items[result.items.length - 1].assetid;
          return this.get({
            appid,
            contextid,
            steamid,
            start,
            result,
            retries,
            retryDelay,
            language,
            tradable
          });
        }

        return result;
      })
      .catch((err) => {
        throw err;
      });
  },
  parse(res: any, progress: InventoryResult, contextid: string, tradable: boolean) {
    const parsed = progress || {
      items: [],
      total: 0
    };

    if (res.success && res.total_inventory_count === 0) {
      return parsed;
    }
    if (!res || !res.success || !res.assets || !res.descriptions) {
      throw new Error('Malformed response');
    }

    parsed.total = res.total_inventory_count;

    Object.values(res.assets).forEach((item: any) => {
      const parsedItem = parseItem({item, descriptions: res.descriptions, contextID: contextid});
      if (!tradable || parsedItem.tradable) {
        parsed.items.push(parsedItem);
      } else {
        parsed.total--;
      }
    });

    return parsed;
  }
};
