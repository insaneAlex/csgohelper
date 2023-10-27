import {COMPONENT_NAME, MIN_MOBILE_WIDTH} from './constants';
import {Icons, Portal} from '@/src/components/ui';
import React, {FC, ReactNode, useState} from 'react';
import {useWindowWidth} from '@/src/hooks';
import Link from 'next/link';

import styles from './hamburger-menu.module.scss';

type Props = {navLinks: {name: string; href: string; renderIcon: () => ReactNode}[]};

export const HamburgerMenu: FC<Props> = ({navLinks}) => {
  const [visible, setVisible] = useState<undefined | boolean>();
  const handleClose = () => visible && setVisible(false);

  useWindowWidth() > MIN_MOBILE_WIDTH && handleClose();

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className={styles.hamburgerBtn}
        aria-label={COMPONENT_NAME}
        title={COMPONENT_NAME}
        type="button"
      >
        <Icons.Hamburger />
      </button>

      <Portal.Portal visible={visible}>
        <Portal.Overlay onClick={handleClose} visible={visible} />

        <Portal.Content onClose={handleClose} visible={visible}>
          <ul className={styles.links}>
            {navLinks.map(({name, href, renderIcon}, i) => (
              <li key={i}>
                <Link href={href} onClick={handleClose}>
                  {renderIcon()}
                  <span className={styles.linkText}>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Portal.Content>
      </Portal.Portal>
    </>
  );
};
