import Link from 'next/link';
import Image from 'next/image';
import {Icons} from '../../ui';
import React, {FC} from 'react';
import {HamburgerMenu} from './components';

import styles from './main-header.module.scss';

export const MainHeader: FC = () => {
  const navLinks = [
    {name: 'Portfolio', href: '/portfolio', renderIcon: () => <Icons.Portfolio />},
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
            {navLinks.map(({name, href, renderIcon}) => (
              <li key={name} className={styles.item}>
                <Link className={styles.link} href={href}>
                  {renderIcon()}
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <Link className={styles.logo} href="/">
            <Image src="/agent.png" width={75} height={50} priority alt="Logo" quality={45} />
            CS2.Helper
          </Link>
        </section>
      </nav>
    </header>
  );
};
