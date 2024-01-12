import cron from 'node-cron';
import axios from 'axios';
import {PriceCacheType} from '@/src/services';

export const fetchPricesUrl = 'http://csgobackpack.net/api/GetItemsList/v2/?no_details=true';
export const pricesCache: PriceCacheType = {prices: null};

export const fetchPrices = async () => {
  try {
    const {data} = await axios.get(fetchPricesUrl);
    pricesCache.prices = data?.items_list;
  } catch (e) {
    console.error(e);
  }
};

fetchPrices();

// update prices every 8 hours
cron.schedule('0 */8 * * *', async () => {
  await fetchPrices();
});
