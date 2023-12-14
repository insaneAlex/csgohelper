import {InventoryItemType} from '@/src/services/steam-inventory';
import {render, screen} from '@testing-library/react';
import {InventoryItem} from '../inventory-item';
import {PriceOptions} from '../../../types';
import {Layout} from 'react-grid-layout';
import {NextRouter} from 'next/router';

jest.mock('../../../../../services', () => ({}));
const routerMock = {useRouter: () => ({push: jest.fn()})} as unknown as NextRouter;
const defaultProps = {router: routerMock, imgSize: {width: 1, height: 1}};
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
  it('should render correctly', () => {
    const {container} = render(<InventoryItem {...defaultProps} item={item} />);
    expect(container).toMatchSnapshot();
  });
  describe('when no image', () => {
    it('should return null', () => {
      render(<InventoryItem {...defaultProps} item={{...item, icon_url: ''}} />);
      const link = screen.queryByRole('link');
      expect(link).not.toBeInTheDocument();
    });
  });
  describe('when stattrak item', () => {
    it('should render name without "StatTrak™ "', () => {
      render(<InventoryItem {...defaultProps} item={{...item, name: 'StatTrak™ PISTOL'}} />);
      const elem = screen.getByText('PISTOL');
      expect(elem).toBeInTheDocument();
    });
  });
  describe('when count is more than 1', () => {
    const count = 3;
    it('should render price prop', () => {
      render(<InventoryItem {...defaultProps} item={{...item, count, price: 3}} />);
      const price = `${(3).toFixed(2)}$`;
      const multiPrice = screen.getByText(price);
      expect(multiPrice).toBeInTheDocument();
    });
  });
});
