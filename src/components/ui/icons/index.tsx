import {CrossIcon} from './close-icon';
import {HamburgerIcon} from './hamburger-icon';

export {BackIcon} from './back-icon';
export {StonksIcon} from './stonks-icon';
export {AccountIcon} from './account-icon';
export {FeedbackIcon} from './feedback-icon';

export const Icons = {
  Cross: () => <CrossIcon fill="currentColor" width={20} height={20} />,
  CrossSmall: () => <CrossIcon fill="currentColor" />,
  CrossLarge: () => <CrossIcon fill="currentColor" width={25} height={25} />,
  Hamburger: () => <HamburgerIcon width={50} height={50} />
};
