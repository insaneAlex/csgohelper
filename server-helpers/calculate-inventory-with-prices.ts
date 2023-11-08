import {NoPriceInventory} from '@/pages/api/csgoInventory';
import {PricesType} from '@/src/services/aws/types';

type Props = {inventory: NoPriceInventory; prices: PricesType};

export const calculateInventoryWithPrices = ({inventory, prices}: Props) =>
  inventory.map((item) => ({...item, prices: prices?.[item.market_hash_name]?.price}));
