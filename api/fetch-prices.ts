import {INVENTORY_ERRORS, PRICES_API_URL} from './constants';
import {PriceType} from './types';
import axios from 'axios';

export type PriceCacheType = {prices: {[key: string]: {price: PriceType}} | null; lastUpdated: Date | null};

export const fetchPrices = async ({cache}: {cache: PriceCacheType}) => {
  try {
    const {data} = await axios.get(PRICES_API_URL);
    cache.prices = data?.items_list;
    cache.lastUpdated = new Date();
  } catch (e) {
    console.log(`${INVENTORY_ERRORS.PRICES_API_FETCH_ERROR} : ${e}`);
  }
};
