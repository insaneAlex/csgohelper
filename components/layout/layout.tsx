import React, {FC, ReactNode} from "react";
import styles from "./page-layout.module.css";

export const Layout: FC<{children: ReactNode}> = ({children}) => {
  return <div className={styles.page}>{children}</div>;
};
