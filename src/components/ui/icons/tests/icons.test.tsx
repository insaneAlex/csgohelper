import {render, screen} from '@testing-library/react';
import {HamburgerIcon} from '../hamburger-icon';
import {PortfolioIcon} from '../portfolio-icon';
import {FeedbackIcon} from '../feedback-icon';
import {AccountIcon} from '../account-icon';
import {BackIcon} from '../back-icon';

describe('Icons', () => {
  describe('AccountIcon', () => {
    it('should render correctly', () => {
      render(<AccountIcon />);
      expect(screen.getByTestId('AccountIcon')).toBeInTheDocument();
    });
  });
  describe('BackIcon', () => {
    it('should render correctly', () => {
      render(<BackIcon />);
      expect(screen.getByTestId('BackIcon')).toBeInTheDocument();
    });
  });
  describe('FeedbackIcon', () => {
    it('should render correctly', () => {
      render(<FeedbackIcon />);
      expect(screen.getByTestId('FeedbackIcon')).toBeInTheDocument();
    });
  });
  describe('HamburgerIcon', () => {
    it('should render correctly', () => {
      render(<HamburgerIcon />);
      expect(screen.getByTestId('HamburgerIcon')).toBeInTheDocument();
    });
  });
  describe('PortfolioIcon', () => {
    it('should render correctly', () => {
      render(<PortfolioIcon />);
      expect(screen.getByTestId('PortfolioIcon')).toBeInTheDocument();
    });
  });
});
