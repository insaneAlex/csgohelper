import {InventoryItemType} from '@/src/services';
import {filterInventory} from './filter-inventory';
import {getUniqueItems} from './get-unique-items';
import {StrArrObject} from '@/types';
import {ParsedUrlQuery} from 'querystring';
import {DUPLICATES_PARAM} from '../components';

type Props = {filters: StrArrObject; query: ParsedUrlQuery; inventoryItems: InventoryItemType[]};

export const modifyInventory = ({filters, inventoryItems, query}: Props) => {
  let inventory = inventoryItems;
  if (Object.keys(filters).length > 0) {
    inventory = filterInventory({inventory, filters});
  }
  if (query?.[DUPLICATES_PARAM] === 'false') {
    inventory = getUniqueItems({inventory});
  }
  return inventory;
};
