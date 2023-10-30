import Link from 'next/link';
import {Icons} from '../../ui';
import React, {FC} from 'react';
import {HamburgerMenu} from './components';

import styles from './main-header.module.scss';

export const MainHeader: FC = () => {
  const navLinks = [
    {name: 'Stonks', href: '/stonks', renderIcon: () => <Icons.Stonks />},
    {name: 'Feedback', href: '/feedback', renderIcon: () => <Icons.Feedback />},
    {name: 'Login', href: '/login', renderIcon: () => <Icons.Account />}
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
                <Link className={styles.link} href={href}>
                  {renderIcon()}
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <Link className={styles.logo} href="/">
            CS2.Helper
          </Link>
        </section>
      </nav>
    </header>
  );
};
