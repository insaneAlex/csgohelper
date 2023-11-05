import {InventoryItemType} from '@/src/services/steam-inventory';

type Props = {inventory: InventoryItemType[]; filters: Record<string, string[]>};

export const filterInventory = ({inventory, filters}: Props) =>
  inventory.filter(({type, weapon}) => filters.types?.includes(type) || filters[type]?.includes(weapon as string));
