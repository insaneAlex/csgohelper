import {PriceCacheType, fetchCsPrices} from '../';
import {PricesType} from '../aws/types';
import axios from 'axios';
jest.mock('axios');
jest.mock('../../services/aws', () => ({}));
describe('fetchCsPrices', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should fetch prices and update the cache on successful request', async () => {
    const cache: PriceCacheType = {prices: [] as unknown as PricesType, lastUpdated: null};
    const mockedData = {items_list: [{name: 'item1', price: 10}]};
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({data: mockedData});
    await fetchCsPrices({cache});
    expect(cache.prices).toEqual(mockedData.items_list);
    expect(cache.lastUpdated).toBeInstanceOf(Date);
  });
  it('should handle errors and log them to the console', async () => {
    const cache: PriceCacheType = {prices: [] as unknown as PricesType, lastUpdated: null};
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue('Internal Server Error');
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});
    await fetchCsPrices({cache});
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockRestore();
  });
});
