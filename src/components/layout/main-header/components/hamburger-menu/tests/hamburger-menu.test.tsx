import {render, screen} from '@testing-library/react';
import {HamburgerMenu} from '../hamburger-menu';

jest.mock('../../../../../../services', () => ({}));

const navLinksMock = [
  {name: 'Stonks', href: '/stonks', renderIcon: () => <span>icon1</span>},
  {name: 'Feedback', href: '/feedback', renderIcon: () => <span>icon2</span>}
];

describe('AppLayout', () => {
  it('renders navLinks correctly', () => {
    render(<HamburgerMenu navLinks={navLinksMock} />);

    expect(screen.getByText('Stonks')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
  });
});
