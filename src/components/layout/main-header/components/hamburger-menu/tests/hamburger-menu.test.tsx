import {fireEvent, render, screen} from '@testing-library/react';
import {HamburgerMenu} from '../hamburger-menu';

jest.mock('../../../../../../services', () => ({}));

const navLinksMock = [
  {name: 'Portfolio', href: '/portfolio', renderIcon: () => <span>icon1</span>},
  {name: 'Feedback', href: '/feedback', renderIcon: () => <span>icon2</span>}
];

describe('HamburgerMenu', () => {
  it('renders navLinks correctly', () => {
    render(<HamburgerMenu navLinks={navLinksMock} />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
  });
  describe('when user clicks on hamburger button', () => {
    it('should show portal', () => {
      render(<HamburgerMenu navLinks={navLinksMock} />);
      expect(screen.getByTestId('portal')).toHaveStyle('z-index: -1;');
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId('portal')).toHaveStyle('z-index: 101;');
    });
  });
});
