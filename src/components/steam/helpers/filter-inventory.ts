import {InventoryItemType} from '@/types';

type Props = {inventory: InventoryItemType[]; filters: Record<string, string[]>};

export const filterInventory = ({inventory, filters}: Props) =>
  inventory.filter(({type, weapon}) => filters.types?.includes(type) || filters[type]?.includes(weapon as string));
