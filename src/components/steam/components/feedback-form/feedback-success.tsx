import {FC} from 'react';
import {useRouter} from 'next/router';
import {Button} from '@/src/components/ui';

import styles from './feedback-success.module.scss';

export const FeedbackSuccess: FC = () => {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Thank you!</h3>
      <p className={styles.text}>Feedback have been successfully sent.</p>

      <Button onClick={() => router.push('/')}>Return to Home</Button>
    </section>
  );
};
