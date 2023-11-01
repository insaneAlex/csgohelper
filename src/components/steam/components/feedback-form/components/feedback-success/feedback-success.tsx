import {FC} from 'react';

import styles from './feedback-success.module.scss';
import Link from 'next/link';

export const FeedbackSuccess: FC = () => {
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Thank you!</h3>
      <p>Feedback have been successfully sent!</p>

      <Link className={styles.link} href="/">
        Return to Home
      </Link>
    </section>
  );
};
