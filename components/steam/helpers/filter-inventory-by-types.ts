import {InventoryItemType, ItemType} from '@/types';
import {getTagValue} from './get-tag-value';

type Props = {inventory: InventoryItemType[]; types: ItemType[]};

export const filterInventoryByTypes = ({inventory, types}: Props) =>
  inventory.filter(({tags}) => {
    const tagName = getTagValue({tags, tag: 'Type'}) as ItemType;

    return types.includes(tagName);
  });
