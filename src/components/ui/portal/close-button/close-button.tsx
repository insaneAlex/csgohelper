import {CLOSE_BUTTON_SIZES} from './constants';
import {Icons} from '../../icons';
import React from 'react';

import styles from './close-button.module.scss';

type Props = {
  title?: string;
  size?: string;
  theme?: string;
  compId?: string;
  onClick: (event: React.MouseEvent) => void;
};

export const CloseButton = React.forwardRef<HTMLButtonElement, Props>(
  ({title = 'Close', onClick, size = CLOSE_BUTTON_SIZES.regular}, buttonRef) => {
    return (
      <button
        type="button"
        aria-label={title}
        title={title}
        className={styles.closeBtn}
        onClick={onClick}
        ref={buttonRef}
      >
        {size === CLOSE_BUTTON_SIZES.small && <Icons.CrossSmall />}
        {size === CLOSE_BUTTON_SIZES.regular && <Icons.Cross />}
        {size === CLOSE_BUTTON_SIZES.large && <Icons.CrossLarge />}
      </button>
    );
  }
);

CloseButton.displayName = 'CloseButton';
