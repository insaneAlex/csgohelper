import {InventoryItemType, ItemType} from '@/types';

type Props = {inventory: InventoryItemType[]; types: ItemType[]};

export const filterInventoryByTypes = ({inventory, types}: Props) => inventory.filter(({type}) => types.includes(type));
