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
              <Link href="/events">All Events</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
