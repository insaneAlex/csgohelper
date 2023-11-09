import axios from 'axios';
import {PricesType} from './aws/types';

export type PriceCacheType = {prices: PricesType; lastUpdated: Date | null};

export const fetchPricesUrl = 'http://csgobackpack.net/api/GetItemsList/v2/?no_details=true';

export const fetchPrices = async ({cache}: {cache: PriceCacheType}) => {
  try {
    const {data} = await axios.get(fetchPricesUrl);
    cache.prices = data?.items_list;
    cache.lastUpdated = new Date();
  } catch (e) {
    console.log(e);
  }
};
