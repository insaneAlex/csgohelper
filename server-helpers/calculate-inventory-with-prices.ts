import {PricesType} from '@/src/services/aws/types';
import {InventoryItemType} from '@/src/services/steam-inventory';

type Props = {inventory: InventoryItemType[]; prices: PricesType};

export const calculateInventoryWithPrices = ({inventory, prices}: Props) =>
  inventory.map((item) => ({...item, prices: prices?.[item.market_hash_name]?.price}));
