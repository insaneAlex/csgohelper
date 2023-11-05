import {GetInventoryParams, InventoryGlobalType, InventoryResponseType, ItemType} from './types';
import axios from 'axios';
import {parseItem} from './parse-item';

class InventoryApi {
  async get({
    steamid,
    appid = 730,
    count = 1000,
    contextid = 2,
    language = 'english',
    tradable = false
  }: GetInventoryParams) {
    const url = `http://steamcommunity.com/inventory/${steamid}/${appid}/${contextid}?l=${language}&count=${count}`;

    try {
      const {data} = await axios.get(url);

      return this.parse(data, tradable);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  parse(res: InventoryResponseType, tradable: boolean) {
    const items = [] as InventoryGlobalType[];

    if (res.success && res.total_inventory_count === 0) {
      return items;
    }
    if (!res || !res.success || !res.assets || !res.descriptions) {
      throw new Error('Malformed response');
    }

    Object.values(res.assets).forEach((item: ItemType) => {
      const parsedItem = parseItem({item, descriptions: res.descriptions});
      if (!tradable || parsedItem.tradable) {
        items.push(parsedItem);
      }
    });

    return items;
  }
}

export const inventoryApi = new InventoryApi();
