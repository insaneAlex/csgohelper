import {render} from '@testing-library/react';
import Login from '../index';

jest.mock('../../../src/services', () => ({noop: () => jest.fn()}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn()})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: jest.fn()}));

describe('Login', () => {
  it('should render correctly', () => {
    const {container} = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
