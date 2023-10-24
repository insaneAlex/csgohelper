import {ErrorAlert} from '@/src/components/ui';
import Head from 'next/head';
import {FC} from 'react';

const Stonks: FC = () => {
  return (
    <>
      <Head>
        <title>CS2.Helper - Stonks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ErrorAlert>Coming soon</ErrorAlert>
    </>
  );
};

export default Stonks;
