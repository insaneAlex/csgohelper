import {Descriptions, GetInventoryParams, InventoryGlobalType, InventoryResponseType, ItemType} from './types';
import {ENV} from '../environment';
import axios from 'axios';

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

    const {data} = await axios.get(url);

    return this.parse(data, tradable);
  }
  async getSteamIdByCustomUrl({steamid}: GetInventoryParams) {
    const getSteamId64Url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${ENV.STEAM_WEB_API}&vanityurl=${steamid}`;
    try {
      const {data} = await axios.get(getSteamId64Url);
      return data;
    } catch (e) {
      return steamid;
    }
  }
  async getProfile({steamid}: {steamid: string}) {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${ENV.STEAM_WEB_API}&steamids=${steamid}`;

    const {data} = await axios.get(url);
    const responseProfile = data?.response?.players?.[0];
    const {avatarfull, personaname, profileurl} = responseProfile;

    return {avatarfull, personaname, profileurl};
  }

  parse(res: InventoryResponseType, tradable: boolean) {
    const items = [] as InventoryGlobalType[];

    if (res?.success && res?.total_inventory_count === 0) {
      return items;
    }
    if (!res || !res?.success || !res?.assets || !res?.descriptions) {
      throw new Error('Malformed response');
    }

    Object.values(res.assets).forEach((item: ItemType) => {
      const parsedItem = this.parseItem(item, res.descriptions);
      if (!tradable || parsedItem.tradable) {
        items.push(parsedItem);
      }
    });

    return items;
  }

  parseItem(item: ItemType, descriptions: Descriptions[]) {
    const parsed = {
      ...item,
      assetid: item.id || item.assetid,
      tradable: item.tradable,
      marketable: item.marketable,
      descriptions: item.descriptions || []
    };

    if (descriptions) {
      const description = descriptions.find(
        (desc) => desc.classid === parsed.classid && desc.instanceid === parsed.instanceid
      );
      description && Object.assign(parsed, description);
    }

    return parsed as unknown as InventoryGlobalType;
  }
}

export const inventoryApi = new InventoryApi();
