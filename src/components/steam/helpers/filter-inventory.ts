import {InventoryItemType} from '@/src/services/steam-inventory';
import {StrArrObject} from '@/types';

type Props = {inventory: InventoryItemType[]; filters: StrArrObject};

export const filterInventory = ({inventory, filters}: Props) =>
  inventory.filter(({type, weapon}) => filters.types?.includes(type) || filters[type]?.includes(weapon as string));
