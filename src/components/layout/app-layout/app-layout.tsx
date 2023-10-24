import React, {FC, ReactNode} from 'react';
import {MainHeader} from '../main-header/main-header';
import styles from './app-layout.module.scss';

type Props = {children: ReactNode};

export const AppLayout: FC<Props> = ({children}) => {
  return (
    <>
      <MainHeader />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>All rights reserved &#169;2023</footer>
    </>
  );
};
