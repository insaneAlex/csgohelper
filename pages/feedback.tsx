import Head from 'next/head';
import {FC} from 'react';

const Feedback: FC = () => {
  const fetchFeedbackEndpoint = async (): Promise<any> => {
    const url = `${window.location.origin}/api/feedback`;

    const response = await fetch(url);
    return response.json();
  };

  const fetchStonksEndpoint = async (): Promise<any> => {
    const url = `${window.location.origin}/api/stonks`;

    const response = await fetch(url);
    return response.json();
  };

  const handleFetchFeedbackEndpoint = async () => {
    try {
      console.log('sending fetchFeedbackEndpoint');
      const res = await fetchFeedbackEndpoint();
      console.log(res.status);
    } catch (e: any) {
      console.log(e?.status);
    }
  };

  const handleFetchStonksEndpoint = async () => {
    try {
      console.log('sending fetchStonksEndpoint');
      const res = await fetchStonksEndpoint();
      console.log(res.status);
    } catch (e: any) {
      console.log(e?.status);
    }
  };

  return (
    <>
      <Head>
        <title>CS2.Helper - Leave Feedback</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      Feedback
      <div>
        <button style={{color: 'red'}} onClick={handleFetchFeedbackEndpoint}>
          Fetch api/feedback
        </button>
      </div>
      <div>
        <button style={{color: 'red'}} onClick={handleFetchStonksEndpoint}>
          Fetch api/stonks
        </button>
      </div>
    </>
  );
};

export default Feedback;
