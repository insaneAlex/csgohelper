import React, {FC, ReactNode} from "react";
import MainHeader from "./main-header";
import styles from "./layout.module.scss";

type Props = {children: ReactNode};

export const Layout: FC<Props> = ({children}) => {
  return (
    <div className={styles.layout}>
      <MainHeader />
      <div className={styles.mainWrapper}>
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>All rights reserved &#169;2023</footer>
    </div>
  );
};
