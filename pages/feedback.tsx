import {FeedbackStatuses, feedbackStatusSelector, onResetState} from '@/src/redux/features';
import {FeedbackForm, FeedbackSuccess, FeedbackHeader} from '@/src/components/steam';
import {useSelector, useDispatch} from 'react-redux';
import {Loader} from '@/src/components/ui';
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

  const renderContent = () => {
    switch (feedbackStatus) {
      case FeedbackStatuses.LOADING:
        return <Loader />;
      case FeedbackStatuses.SUCCESS:
        return <FeedbackSuccess />;
      default:
        return (
          <>
            <FeedbackHeader title="Have any thoughts or ideas? Share them with us below" />
            <FeedbackForm />
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <title>CS2.Helper - Share your thoughts with us</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {renderContent()}
    </>
  );
};

export default Feedback;
