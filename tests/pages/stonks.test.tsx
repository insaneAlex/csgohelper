import {render} from '@testing-library/react';
import Stonks from '../../pages/stonks';

jest.mock('../../src/services', () => ({}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn()})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: jest.fn()}));

describe('Stonks', () => {
  it('should render correctly', () => {
    const {container} = render(<Stonks />);
    expect(container).toMatchSnapshot();
  });
});
