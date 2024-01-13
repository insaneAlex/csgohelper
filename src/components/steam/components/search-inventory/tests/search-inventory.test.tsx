import {fireEvent, render, screen} from '@testing-library/react';
import {SearchInventory} from '../search-inventory';
import {getItemsStart} from '@/src/redux';

const steamid = 'steamid';
const dispatchMock = jest.fn();
jest.mock('../../../../../services', () => ({storage: {localStorage: {get: jest.fn(() => steamid)}}}));
jest.mock('react-redux', () => ({useSelector: jest.fn(), useDispatch: () => dispatchMock}));

describe('SearchInventory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when user submit form with saved steamId', () => {
    it('should call getItemsStart action', () => {
      render(<SearchInventory loading={false} />);
      const submitButton = screen.getByText('Search inventory');
      fireEvent.click(submitButton);
      expect(dispatchMock).toHaveBeenCalledWith(getItemsStart({isForceUpdate: true, steamid}));
    });
  });
  describe('when user changes steamid value', () => {
    it('should call getItemsStart with changed value', () => {
      render(<SearchInventory loading={false} />);
      const expectedValue = 'changedValue';
      const input = screen.getByPlaceholderText('Enter your SteamID');
      const submitButton = screen.getByText('Search inventory');
      fireEvent.input(input, {target: {value: expectedValue}});
      fireEvent.click(submitButton);
      expect(dispatchMock).toHaveBeenCalledWith(getItemsStart({isForceUpdate: true, steamid: expectedValue}));
    });
  });
  describe('user trying to submit without value', () => {
    it('button should be disabled', () => {
      render(<SearchInventory loading={false} />);
      const input = screen.getByPlaceholderText('Enter your SteamID');
      const submitButton = screen.getByRole('button');
      fireEvent.input(input, {target: {value: ''}});
      expect(submitButton).toBeDisabled();
    });
  });
});
