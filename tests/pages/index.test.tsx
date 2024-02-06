import * as selectors from '@/src/redux/features';
import {render, screen} from '@testing-library/react';
import {InventoryItemType} from '@/src/services';
import itemsMock from '../../mocks/items.json';
import {SteamInventory} from '@/pages';

jest.mock('../../src/hooks', () => ({
  useListenToMediaQuery: jest.fn(),
  useMedia: () => jest.fn(),
  useRowGridItems: jest.fn().mockImplementation(() => ({itemsPerRow: 5, rowsAmount: 5}))
}));
jest.mock('@/src/services', () => ({storage: {localStorage: {get: () => 'steamid'}}}));
jest.mock('next/router', () => ({useRouter: () => ({query: {'Pistol': 'Fiv'}})}));
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  connect: () => jest.fn()
}));

const onGetItemsMock = jest.fn();
const defaultProps = {
  onGetItems: onGetItemsMock,
  status: selectors.InventoryStatuses.IDLE,
  inventoryItems: itemsMock as unknown as InventoryItemType[]
};

describe('SteamInventory', () => {
  it('should render elements', () => {
    render(<SteamInventory {...defaultProps} />);
    expect(screen.getByTestId('search-block')).toBeInTheDocument();
  });

  describe('when there is no items and steamid applied', () => {
    it('should call onGetItems action', () => {
      render(<SteamInventory {...defaultProps} inventoryItems={[]} />);
      expect(onGetItemsMock).toHaveBeenCalledTimes(1);
      expect(onGetItemsMock).toHaveBeenCalledWith({steamid: 'steamid'});
    });
  });
});
