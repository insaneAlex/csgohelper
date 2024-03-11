import axios from 'axios';
import {PriceCacheType} from './types';

const fetchCsPricesUrl = 'http://csgobackpack.net/api/GetItemsList/v2/?no_details=true';

export const fetchCsPrices = async ({cache}: {cache: PriceCacheType}) => {
  try {
    const {data} = await axios.get(fetchCsPricesUrl);
    cache.prices = data?.items_list;
    cache.lastUpdated = new Date();
  } catch (e) {
    console.error(e);
  }
};
