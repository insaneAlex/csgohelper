import {render, screen} from '@testing-library/react';
import {HamburgerMenu} from '../hamburger-menu';

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
});
