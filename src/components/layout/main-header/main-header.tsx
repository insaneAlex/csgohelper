import {AccountIcon, FeedbackIcon, StonksIcon} from '../../ui';
import {HamburgerMenu} from './components';
import React, {FC} from 'react';
import Link from 'next/link';

import styles from './main-header.module.scss';

export const MainHeader: FC = () => {
  const navLinks = [
    {name: 'Stonks', href: '/stonks', renderIcon: () => <StonksIcon />},
    {name: 'Feedback', href: '/feedback', renderIcon: () => <FeedbackIcon />},
    {name: 'Login', href: '/login', renderIcon: () => <AccountIcon />}
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <section className={styles.container}>
          <span className={styles.hamburger}>
            <HamburgerMenu navLinks={navLinks} />
          </span>
          <ul className={styles.items}>
            {navLinks.map(({name, href, renderIcon}, i) => (
              <li key={i} className={styles.item}>
                <Link href={href}>
                  {renderIcon()}
                  <span className={styles.iconText}>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.logo}>
            <Link href="/">CS2.Helper</Link>
          </div>
        </section>
      </nav>
    </header>
  );
};
