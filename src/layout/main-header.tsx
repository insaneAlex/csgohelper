import {FC} from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './main-header.module.scss';

export const MainHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <section className={classNames(styles.navbarContainer, styles.container)}>
          <input type="checkbox" />
          <div className={styles.hamburgerLines}>
            <span className={classNames(styles.line, styles.line1)}></span>
            <span className={classNames(styles.line, styles.line2)}></span>
            <span className={classNames(styles.line, styles.line3)}></span>
          </div>

          <ul className={styles.items}>
            <li className={styles.item}>
              <Link href="/feedback">
                <span className={styles.linkCaption}>Leave Feedback</span>
              </Link>
            </li>

            <li className={styles.item}>
              <Link href="/login">
                <span className={styles.linkCaption}>Login</span>
              </Link>
            </li>
          </ul>
          <div className={styles.logo}>
            <Link href="/">CSGO.Helper</Link>
          </div>
        </section>
      </nav>
    </header>
  );
};
