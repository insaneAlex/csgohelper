import {render, screen} from '@testing-library/react';
import {MainHeader} from '../main-header';

jest.mock('../../../../services', () => ({}));

describe('MainHeader', () => {
  it('should render navigation correctly', () => {
    render(<MainHeader />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
