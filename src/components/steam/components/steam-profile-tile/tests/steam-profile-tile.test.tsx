import {render} from '@testing-library/react';

import {SteamProfileTile} from '../steam-profile-tile';

const useSelectorMock = jest.fn();
jest.mock('../../../../../hooks', () => ({useListenToMediaQuery: jest.fn(), useMedia: jest.fn()}));
jest.mock('react-redux', () => ({useSelector: () => useSelectorMock(), useDispatch: () => jest.fn()}));

const profileMock = {avatarfull: 'https://avatars.full.jpg', personaname: 'boobaii', profileurl: 'url'};
describe('SteamProfileTile', () => {
  it('should render correctly', () => {
    useSelectorMock.mockReturnValue(profileMock);
    const {container} = render(<SteamProfileTile itemsAmount={111} totalPrice="111$" />);
    expect(container).toMatchSnapshot();
  });
});
