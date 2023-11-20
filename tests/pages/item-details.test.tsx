import {InventoryStatuses} from '@/src/redux/features';
import ItemDetailsPage from '../../pages/items/[itemId]';
import {render, screen} from '@testing-library/react';

const itemId = '123';
const query = {itemId};
const itemMock = {assetid: itemId, name: 'name1', exterior: 'super fine'};

const itemsSelectorMock = jest.fn();
const statusSelectorMock = jest.fn();
const routerReplaceMock = jest.fn();
const getFromStorageMock = jest.fn();

jest.mock('../../src/services', () => ({storage: {localStorage: {get: () => getFromStorageMock()}}}));
jest.mock('next/router', () => ({useRouter: () => ({query, replace: (a: string) => routerReplaceMock(a)})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: (selector: () => void) => selector()}));
jest.mock('../../src/redux', () => ({
  itemsSelector: () => itemsSelectorMock(),
  inventoryStatusSelector: () => statusSelectorMock(),
  getItemsStart: jest.fn()
}));

describe('ItemDetailsPage', () => {
  it('should render correctly', () => {
    itemsSelectorMock.mockImplementationOnce(() => [itemMock]);
    const {container} = render(<ItemDetailsPage />);
    expect(container).toMatchSnapshot();
  });
  describe('when loading status applied', () => {
    it('should render loader', () => {
      getFromStorageMock.mockImplementationOnce(() => '123');
      statusSelectorMock.mockImplementationOnce(() => InventoryStatuses.INIT_LOAD);
      render(<ItemDetailsPage />);
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });
  describe('when has items but without selected assetid', () => {
    it('should render error message with "return to home" button', () => {
      getFromStorageMock.mockImplementationOnce(() => '123');
      itemsSelectorMock.mockImplementationOnce(() => [{...itemMock, assetid: '321'}]);
      render(<ItemDetailsPage />);
      expect(screen.getByText('There is no such item in inventory.')).toBeInTheDocument();
      expect(screen.getByText('Return to Home')).toBeInTheDocument();
    });
  });
  describe('when there is not item and no steamid', () => {
    it('should redirect to home', () => {
      getFromStorageMock.mockImplementationOnce(() => null);
      itemsSelectorMock.mockImplementationOnce(() => [{...itemMock, assetid: '321'}]);
      render(<ItemDetailsPage />);
      expect(routerReplaceMock).toHaveBeenCalledWith('/');
    });
  });
});
