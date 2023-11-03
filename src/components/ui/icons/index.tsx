import {AccountIcon} from './account-icon';
import {BackIcon} from './back-icon';
import {FeedbackIcon} from './feedback-icon';
import {HamburgerIcon} from './hamburger-icon';
import {StonksIcon} from './stonks-icon';

export const Icons = {
  Hamburger: () => <HamburgerIcon width={30} height={30} />,
  Back: () => <BackIcon width={30} height={30} />,
  BackSmall: () => <BackIcon />,

  Stonks: () => <StonksIcon />,
  Feedback: () => <FeedbackIcon />,
  Account: () => <AccountIcon />
};
