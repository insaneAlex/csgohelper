import Link from "next/link";
import {FC} from "react";
import styles from "./main-header.module.scss";

const MainHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/">NextEvents</Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href="/events">
                <span className={styles.linkCaption}>All Events</span>
              </Link>
            </li>
            <li>
              <Link href="/steam-inventory">
                <span className={styles.linkCaption}>Steam inventory</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
