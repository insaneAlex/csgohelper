import {PriceType} from '@/src/services';
import {InventoryItemType} from '@/types';

type Props = {inventory: InventoryItemType[]; prices: {[key: string]: {price: PriceType}}};

export const calculateInventoryWithPrices = ({inventory, prices}: Props) =>
  inventory.map((item) => ({...item, prices: prices[item.market_hash_name]?.price}));
