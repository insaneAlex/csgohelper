import {render} from '@testing-library/react';
import Stonks from '../index';

jest.mock('../../../src/services', () => ({noop: () => jest.fn()}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn()})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: jest.fn()}));

describe('Stonks', () => {
  it('should render correctly', () => {
    const {container} = render(<Stonks />);
    expect(container).toMatchSnapshot();
  });
});
