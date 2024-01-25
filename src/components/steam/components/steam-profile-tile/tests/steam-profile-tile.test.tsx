import {render} from '@testing-library/react';

import {SteamProfileTile} from '../steam-profile-tile';

jest.mock('../../../../../services', () => ({createMediaQuery: () => {}}));
jest.mock('react-redux', () => ({useSelector: jest.fn(), useDispatch: () => jest.fn()}));

describe('SteamProfileTile', () => {
  it('should render correctly', () => {
    const {container} = render(<SteamProfileTile itemsAmount={111} totalPrice="111$" />);
    expect(container).toMatchSnapshot();
  });
});
