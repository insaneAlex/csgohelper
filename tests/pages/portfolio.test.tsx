import {render} from '@testing-library/react';
import Portfolio from '../../pages/portfolio';

jest.mock('../../src/services', () => ({}));
jest.mock('next/router', () => ({useRouter: () => ({push: jest.fn()})}));
jest.mock('react-redux', () => ({useDispatch: () => jest.fn(), useSelector: jest.fn()}));

describe('Portfolio', () => {
  it('should render correctly', () => {
    const {container} = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });
});
