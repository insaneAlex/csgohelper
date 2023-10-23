import {InventoryItemType} from '@/types';
import {PriceType} from '../types';

type Props = {inventory: InventoryItemType[]; prices: {[key: string]: {price: PriceType}} | null};

export const calculateInventoryWithPrices = ({inventory, prices}: Props) =>
  prices ? inventory.map((item) => ({...item, prices: prices[item.market_hash_name]?.price})) : inventory;
