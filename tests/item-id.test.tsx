import ItemDetailsPage from '../pages/items/[itemId]';
import {render} from '@testing-library/react';

const itemId = '123';
const itemMock = {assetid: itemId, name: 'name1', exterior: 'super fine'};

jest.mock('../src/services', () => ({storage: {localStorage: {get: () => jest.fn()}}}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn(), query: {itemId}})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: (selector: () => void) => selector()}));
jest.mock('../src/redux', () => ({itemsSelector: () => [itemMock], getItemsStart: jest.fn()}));

describe('ItemDetailsPage', () => {
  it('should render correctly', () => {
    const {container} = render(<ItemDetailsPage />);
    expect(container).toMatchSnapshot();
  });
});
