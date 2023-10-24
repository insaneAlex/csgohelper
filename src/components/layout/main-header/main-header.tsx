import React, {FC, ReactNode} from 'react';
import Link from 'next/link';
import {HamburgerButton} from './components';
import {useWindowWidth} from '@/src/hooks';
import styles from './main-header.module.scss';

export type NavLinksType = {name: string; href: string; renderIcon: () => ReactNode}[];
type Props = {setIsVisible: (arg: boolean) => void; navLinks: NavLinksType};

export const MainHeader: FC<Props> = ({setIsVisible, navLinks}) => {
  const width = useWindowWidth();
  const hideHamburger = width > 768;

  if (hideHamburger) {
    setIsVisible(false);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <section className={styles.container}>
          {!hideHamburger && <HamburgerButton onClick={() => setIsVisible(true)} />}
          {hideHamburger && (
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
          )}
          <div className={styles.logo}>
            <Link href="/">CS2.Helper</Link>
          </div>
        </section>
      </nav>
    </header>
  );
};
