import {FC, ReactNode} from 'react';
import styles from './error-alert.module.scss';

export const ErrorAlert: FC<{children: ReactNode}> = ({children}) => <div className={styles.alert}>{children}</div>;
