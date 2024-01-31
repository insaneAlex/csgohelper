import {render} from '@testing-library/react';
import Portfolio from '../../pages/portfolio';

describe('Portfolio', () => {
  it('should render correctly', () => {
    const {container} = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });
});
