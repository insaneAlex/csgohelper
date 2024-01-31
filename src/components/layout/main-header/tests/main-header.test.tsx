import {render, screen} from '@testing-library/react';
import {MainHeader} from '../main-header';

describe('MainHeader', () => {
  it('should render navigation correctly', () => {
    render(<MainHeader />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
