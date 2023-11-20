import {HamburgerIcon} from '../hamburger-icon';
import {render, screen} from '@testing-library/react';
import {FeedbackIcon} from '../feedback-icon';
import {AccountIcon} from '../account-icon';
import {StonksIcon} from '../stonks-icon';
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
  describe('StonksIcon', () => {
    it('should render correctly', () => {
      render(<StonksIcon />);
      expect(screen.getByTestId('StonksIcon')).toBeInTheDocument();
    });
  });
});
