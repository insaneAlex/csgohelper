import {InventoryGlobalType} from '@/src/services/steam-inventory';
import {NoPriceInventory} from '@/pages/api/csgoInventory';
import {getByTagName} from './get-by-tag-name';

export const minimizeInventory = (inventory: InventoryGlobalType[]): NoPriceInventory =>
  inventory.map(({assetid, name, market_hash_name, name_color, icon_url, tags}) => {
    const exterior = getByTagName({tags, tagName: 'Exterior'}).localized_tag_name;
    const type = getByTagName({tags, tagName: 'Type'}).localized_tag_name;
    const weapon = getByTagName({tags, tagName: 'Weapon'})?.localized_tag_name;
    const rarity_color = getByTagName({tags, tagName: 'Rarity'}).color;

    return {type, name, assetid, exterior, icon_url, name_color, market_hash_name, weapon, rarity_color};
  });
