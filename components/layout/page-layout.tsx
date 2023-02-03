import React, {FC, ReactNode} from "react";
import styles from "./page-layout.module.css";

const PageLayout: FC<{children: ReactNode}> = ({children}) => {
  return <div className={styles.page}>{children}</div>;
};

export default PageLayout;
