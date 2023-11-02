import {FeedbackStatuses, feedbackStatusSelector, onResetState} from '@/src/redux/features';
import {FeedbackForm, FeedbackSuccess, FeedbackHeader} from '@/src/components/steam';
import {useSelector, useDispatch} from 'react-redux';

import {FC, useEffect} from 'react';
import Head from 'next/head';

const Feedback: FC = () => {
  const dispatch = useDispatch();
  const feedbackStatus = useSelector(feedbackStatusSelector);

  useEffect(() => {
    return () => {
      dispatch(onResetState());
    };
  }, []);

  return (
    <>
      <Head>
        <title>CS2.Helper - Share your thoughts with us</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {feedbackStatus === FeedbackStatuses.SUCCESS ? (
        <FeedbackSuccess />
      ) : (
        <>
          <FeedbackHeader title="Have any thoughts or ideas? Share them with us below" />
          <FeedbackForm />
        </>
      )}
    </>
  );
};

export default Feedback;
