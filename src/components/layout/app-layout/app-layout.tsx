import React, {FC, ReactNode, useState} from 'react';
import {MainHeader} from '../main-header/main-header';
import styles from './app-layout.module.scss';
import {AccountIcon, FeedbackIcon, StonksIcon} from '../../ui';
import {HeaderPortal} from '../main-header';

type Props = {children: ReactNode};

export const AppLayout: FC<Props> = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);

  const navLinks = [
    {name: 'Stonks', href: '/stonks', renderIcon: () => <StonksIcon />},
    {name: 'Feedback', href: '/feedback', renderIcon: () => <FeedbackIcon />},
    {name: 'Login', href: '/login', renderIcon: () => <AccountIcon />}
  ];

  return (
    <>
      <HeaderPortal links={navLinks} isHidden={!isVisible} onExit={() => setIsVisible(false)} />
      <MainHeader navLinks={navLinks} setIsVisible={setIsVisible} />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}> 2023 &#169;CS2.Helper</footer>
    </>
  );
};
