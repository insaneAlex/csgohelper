import {InventoryItemType} from '@/types';

type Props = {inventory: InventoryItemType[]; types: string[]};

export const filterInventoryByTypes = ({inventory, types}: Props) => inventory.filter(({type}) => types.includes(type));
