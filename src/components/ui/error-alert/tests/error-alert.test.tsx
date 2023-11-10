import {render} from '@testing-library/react';
import {ErrorAlert} from '../error-alert';

describe('ErrorAlert', () => {
  it('should render correctly', () => {
    const {container} = render(<ErrorAlert>Some error</ErrorAlert>);
    expect(container).toMatchSnapshot();
  });
});
