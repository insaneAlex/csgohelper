import {render, screen} from '@testing-library/react';
import {InventoryItemType} from '@/src/services/steam-inventory';
import {InventoryItem} from '../inventory-item';
import {PriceOptions} from '../../../types';
import {Layout} from 'react-grid-layout';

const routerPushMock = jest.fn();
jest.mock('../../../../../services', () => ({}));
jest.mock('next/router', () => ({useRouter: () => ({push: routerPushMock})}));

describe('InventoryItem', () => {
  const itemName = 'itmName';
  const item = {
    icon_url: 'icn',
    name_color: 'clr',
    name: itemName,
    assetid: 'id',
    exterior: 'f',
    prices: {[PriceOptions.WEEK]: {average: 2.004}}
  } as unknown as InventoryItemType & Layout;
  const imgSize = {width: 100, height: 100};

  it('should render correctly', () => {
    const {container} = render(<InventoryItem imgSize={imgSize} item={item} />);
    expect(container).toMatchSnapshot();
  });

  describe('when no image', () => {
    it('should return null', () => {
      render(<InventoryItem imgSize={imgSize} item={{...item, icon_url: ''}} />);
      const link = screen.queryByRole('link');
      expect(link).not.toBeInTheDocument();
    });
  });

  describe('when stattrak item', () => {
    it('should render name without "stattrak"', () => {
      render(<InventoryItem imgSize={imgSize} item={{...item, name: 'StatTrak™ PISTOL'}} />);
      const elem = screen.getByText('PISTOL');
      expect(elem).toBeInTheDocument();
    });
  });
  describe('when count is more than 1', () => {
    const count = 3;
    it('should render price*count', () => {
      render(<InventoryItem imgSize={imgSize} item={{...item, count}} />);
      const price = `${(item.prices[PriceOptions.WEEK].average * count).toFixed(2)}$`;
      const multiPrice = screen.getByText(price);
      expect(multiPrice).toBeInTheDocument();
    });
  });
});
