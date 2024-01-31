import {InventoryItemType} from '@/src/services/steam-inventory';
import {render, screen} from '@testing-library/react';

import {PriceOptions} from '../../../types';
import {NextRouter} from 'next/router';
import {ResponsiveInventoryList} from '../responsive-inventory-list';

const dispatchMock = jest.fn();
const selectedId = 'id2';
jest.mock('@/src/services', () => ({}));
jest.mock('react-redux', () => ({useSelector: jest.fn(), useDispatch: () => dispatchMock}));
const routerMock = {useRouter: () => ({push: jest.fn()}), query: {item: selectedId}} as unknown as NextRouter;
const defaultProps = {router: routerMock};
describe('ResponsiveInventoryList', () => {
  const itemName = 'itmName';
  const item = {
    icon_url: 'icn',
    name_color: 'clr',
    name: itemName,
    assetid: 'id1',
    exterior: 'f',
    prices: {[PriceOptions.WEEK]: {average: 2.004}}
  } as unknown as InventoryItemType;
  it('should render correctly', () => {
    const {container} = render(<ResponsiveInventoryList {...defaultProps} items={[item]} />);
    expect(container).toMatchSnapshot();
  });
  describe('when some item is selected', () => {
    it('should render overlay', () => {
      render(<ResponsiveInventoryList {...defaultProps} items={[item, {...item, assetid: selectedId}]} />);
      const overlay = screen.getByTestId('overlay');
      expect(overlay).toBeInTheDocument();
    });
  });
});
