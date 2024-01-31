import {render} from '@testing-library/react';
import Login from '../../pages/login';

describe('Login', () => {
  it('should render correctly', () => {
    const {container} = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
