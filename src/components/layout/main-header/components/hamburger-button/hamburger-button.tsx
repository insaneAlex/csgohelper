import React from 'react';
import styles from './hamburger-button.module.scss';
import {Icons} from '@/src/components/ui';

type Props = {onClick: () => void};

export const HamburgerButton = React.forwardRef<HTMLButtonElement, Props>(({onClick}, buttonRef) => {
  return (
    <button
      className={styles.hamburgerBtn}
      type="button"
      aria-label="HamburgerButton"
      title="HamburgerButton"
      onClick={onClick}
      ref={buttonRef}
    >
      <Icons.Hamburger />
    </button>
  );
});
HamburgerButton.displayName = 'HamburgerButton';
