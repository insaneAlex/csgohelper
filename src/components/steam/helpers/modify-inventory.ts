import {DUPLICATES_PARAM, SORT, SortTypes} from '../components';
import {filterInventory} from './filter-inventory';
import {getUniqueItems} from './get-unique-items';
import {InventoryItemType} from '@/src/services';
import {ParsedUrlQuery} from 'querystring';
import {StrArrObject} from '@/types';
import {sortItems} from './sort-items';

type Props = {filters: StrArrObject; query: ParsedUrlQuery; inventoryItems: InventoryItemType[]};

export const modifyInventory = ({filters, inventoryItems, query}: Props) => {
  const hasFilters = Object.keys(filters).length > 0;
  const isUnique = query?.[DUPLICATES_PARAM] === 'false';
  const sortType = query?.[SORT] as SortTypes;
  const shouldSort = [SortTypes.LowPrice, SortTypes.HighPrice].includes(sortType);
  let inventory = inventoryItems;

  if (hasFilters) {
    inventory = filterInventory({inventory, filters});
  }

  if (isUnique) {
    inventory = getUniqueItems({inventory});
  }

  if (shouldSort) {
    inventory = sortItems({items: inventory, sortType});
  }

  return inventory;
};
