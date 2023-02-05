import React, {FC, ReactNode} from "react";
import styles from "./page-layout.module.scss";

type Props = {children: ReactNode};

export const Layout: FC<Props> = ({children}) => {
  return <div className={styles.page}>{children}</div>;
};
