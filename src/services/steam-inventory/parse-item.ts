import {Descriptions, InventoryGlobalType, ItemType} from './types';

type Props = (arg: {item: ItemType; descriptions?: Descriptions[]}) => InventoryGlobalType;

export const parseItem: Props = ({item, descriptions}) => {
  const parsed = {
    ...item,
    assetid: item.id || item.assetid,
    amount: parseInt(item.amount, 10),
    is_currency: !!item.is_currency,
    tradable: item.tradable,
    marketable: item.marketable,
    commodity: item.commodity,
    market_tradable_restriction: item.market_tradable_restriction || 0,
    market_marketable_restriction: item.market_marketable_restriction || 0,
    fraudwarnings: item.fraudwarnings || [],
    descriptions: item.descriptions || []
  };

  if (descriptions) {
    const description = descriptions.find(
      (desc) => desc.classid === parsed.classid && desc.instanceid === parsed.instanceid
    );

    description && Object.assign(parsed, description);
  }

  return parsed as unknown as InventoryGlobalType;
};
