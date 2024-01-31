import {render} from '@testing-library/react';
import Login from '../../pages/login';

jest.mock('@/src/services', () => ({}));

describe('Login', () => {
  it('should render correctly', () => {
    const {container} = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
