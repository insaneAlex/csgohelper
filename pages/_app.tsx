import Head from 'next/head';
import type {AppProps} from 'next/app';
import {Layout} from '@/src/layout/layout';
import {ReduxProvider} from '@/src/redux/provider';

import '@/styles/globals.scss';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ReduxProvider>
      <Layout>
        <Head>
          <title>CS2.Helper</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
};

export default App;
