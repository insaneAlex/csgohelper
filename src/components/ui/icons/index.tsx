import {HamburgerIcon} from './hamburger-icon';
import {PortfolioIcon} from './portfolio-icon';
import {FeedbackIcon} from './feedback-icon';
import {AccountIcon} from './account-icon';
import {BackIcon} from './back-icon';

export const Icons = {
  Hamburger: () => <HamburgerIcon width={30} height={30} />,
  Back: () => <BackIcon />,

  Portfolio: () => <PortfolioIcon />,
  Feedback: () => <FeedbackIcon />,
  Account: () => <AccountIcon />
};
