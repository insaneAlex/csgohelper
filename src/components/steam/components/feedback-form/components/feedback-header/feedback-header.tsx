import styles from './feedback-header.module.scss';
import {FC} from 'react';

export const FeedbackHeader: FC<{title: string}> = ({title}) => <h1 className={styles.header}>{title}</h1>;
