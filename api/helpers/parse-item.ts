import {InventoryGlobalType} from '../types';

type Props = (arg: {contextID: number; item: InventoryGlobalType; descriptions: any[]}) => any;

export const parseItem: Props = ({item, descriptions, contextID}) => {
  const parsed = {
    ...item,
    assetid: item.id || item.assetid,
    instanceid: item.instanceid || '0',
    amount: parseInt(item.amount, 10),
    contextid: item.contextid || contextID.toString(),
    is_currency: !!item.is_currency,
    tradable: !!item.tradable,
    marketable: !!item.marketable,
    commodity: !!item.commodity,
    market_tradable_restriction: parseInt(item.market_tradable_restriction, 10) || 0,
    market_marketable_restriction: parseInt(item.market_marketable_restriction, 10) || 0,
    fraudwarnings: item.fraudwarnings || [],
    descriptions: item.descriptions || []
  };

  if (descriptions) {
    const description = descriptions.find(
      (desc) => desc.classid === parsed.classid && desc.instanceid === parsed.instanceid
    );

    description && Object.assign(parsed, description);
  }

  if (parsed.owner && JSON.stringify(parsed.owner) === '{}') {
    parsed.owner = null;
  }

  return parsed;
};
