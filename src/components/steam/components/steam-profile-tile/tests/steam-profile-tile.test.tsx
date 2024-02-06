import {SteamProfileTile} from '../steam-profile-tile';
import {render} from '@testing-library/react';

const useSelectorMock = jest.fn();
jest.mock('react-redux', () => ({useSelector: () => useSelectorMock(), useDispatch: () => jest.fn()}));

describe('SteamProfileTile', () => {
  const profileMock = {avatarfull: 'https://ava.jpg', personaname: 'boob', profileurl: 'url'};
  it('should render correctly', () => {
    useSelectorMock.mockReturnValue(profileMock);
    const {container} = render(<SteamProfileTile itemsAmount={111} totalPrice="111$" />);
    expect(container).toMatchSnapshot();
  });
});
