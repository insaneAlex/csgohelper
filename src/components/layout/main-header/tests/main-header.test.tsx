import {render, screen} from '@testing-library/react';
import {MainHeader} from '../main-header';

jest.mock('../../../../services', () => ({noop: () => jest.fn()}));

describe('MainHeader', () => {
  it('should render navigation correctly', () => {
    render(<MainHeader />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});