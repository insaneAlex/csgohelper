import {HamburgerIcon} from '../hamburger-icon';
import {render} from '@testing-library/react';
import {FeedbackIcon} from '../feedback-icon';
import {AccountIcon} from '../account-icon';
import {StonksIcon} from '../stonks-icon';
import {BackIcon} from '../back-icon';

describe('AccountIcon', () => {
  it('should render correctly', () => {
    const {container} = render(<AccountIcon />);
    expect(container).toMatchSnapshot();
  });
});

describe('BackIcon', () => {
  it('should render correctly', () => {
    const {container} = render(<BackIcon />);
    expect(container).toMatchSnapshot();
  });
});
describe('FeedbackIcon', () => {
  it('should render correctly', () => {
    const {container} = render(<FeedbackIcon />);
    expect(container).toMatchSnapshot();
  });
});
describe('HamburgerIcon', () => {
  it('should render correctly', () => {
    const {container} = render(<HamburgerIcon />);
    expect(container).toMatchSnapshot();
  });
});
describe('StonksIcon', () => {
  it('should render correctly', () => {
    const {container} = render(<StonksIcon />);
    expect(container).toMatchSnapshot();
  });
});
