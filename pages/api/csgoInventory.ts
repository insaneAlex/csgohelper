import {getSavedInventory, getShouldFetchPrices, getUpdatedInventory} from '@/server-helpers/';
import {InventoryCacheType, PriceCacheType, fetchCsPrices} from '@/src/services';
import {NextApiRequest, NextApiResponse} from 'next';

type queryValuesType = {isSteamId64: string; steamid: string; isForceUpdate: boolean};

export const pricesCache: PriceCacheType = {prices: null, lastUpdated: null};
export const inventoryCache: InventoryCacheType = {};

const handleError = async (e: {response?: {status?: number}} = {}, steamid: string, isSteamId64: boolean) => {
  const status = e?.response?.status;
  if (status === 403 || status === 404) {
    return {status, response: {inventory: '[]'}};
  }
  const response = await getSavedInventory(inventoryCache, pricesCache, steamid, isSteamId64);
  return {status: response?.statusCode, response};
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid, isForceUpdate} = req.query as unknown as queryValuesType;
  const isSteamId64 = JSON.parse(req.query.isSteamId64 as string);

  if (!steamid) {
    return res.status(400).json({inventory: '[]', error: 'BAD_REQUEST'});
  }
  if (getShouldFetchPrices(new Date(), pricesCache)) {
    await fetchCsPrices({cache: pricesCache});
  }

  if (isForceUpdate) {
    try {
      const response = await getUpdatedInventory(steamid, isSteamId64, pricesCache, inventoryCache);
      return res.status(200).json(response);
    } catch (e) {
      console.error(e);
      const error = await handleError(e as {response?: {status?: number}}, steamid, isSteamId64);

      res.status(error.status).json(error.response);
    }
  } else {
    const response = await getSavedInventory(inventoryCache, pricesCache, steamid, isSteamId64);
    return res.status(response?.statusCode || 201).json(response);
  }
};

export default handler;
