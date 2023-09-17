import Link from "next/link";
import {FC} from "react";
import styles from "./main-header.module.scss";

const MainHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">CSGO Helper</Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href="/feedback">
                <span className={styles.linkCaption}>Leave Feedback</span>
              </Link>
            </li>

            <li>
              <Link href="/login">
                <span className={styles.linkCaption}>Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
