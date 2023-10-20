import {FC} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import {AccountIcon, FeedbackIcon, StonksIcon} from '../ui';

import styles from './main-header.module.scss';

export const MainHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <section className={classNames(styles.navbarContainer, styles.container)}>
          <input type="checkbox" name="hamburger" />
          <div className={styles.hamburgerLines}>
            <span className={classNames(styles.line, styles.line1)}></span>
            <span className={classNames(styles.line, styles.line2)}></span>
            <span className={classNames(styles.line, styles.line3)}></span>
          </div>

          <ul className={styles.items}>
            <li className={styles.item}>
              <Link href="/stonks">
                <StonksIcon />
                <span className={styles.iconText}>Stonks</span>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/feedback">
                <FeedbackIcon />
                <span className={styles.iconText}>Feedback</span>
              </Link>
            </li>

            <li className={styles.item}>
              <Link href="/login">
                <AccountIcon />
                <span className={styles.iconText}>Login</span>
              </Link>
            </li>
          </ul>
          <div className={styles.logo}>
            <Link href="/">CS2.Helper</Link>
          </div>
        </section>
      </nav>
    </header>
  );
};
