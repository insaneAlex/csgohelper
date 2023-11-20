import React, {FC, ReactNode} from 'react';
import {MainHeader} from '../main-header';
import styles from './app-layout.module.scss';

type Props = {children: ReactNode};

export const AppLayout: FC<Props> = ({children}) => (
  <>
    <MainHeader />
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>2023 &#169;CS2.Helper</footer>
  </>
);
