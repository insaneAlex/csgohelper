import Head from 'next/head';
import type {AppProps} from 'next/app';
import {ReduxProvider} from '@/src/redux/provider';
import {AppLayout} from '@/src/components';
import '@/styles/globals.scss';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ReduxProvider>
      <AppLayout>
        <Head>
          <title>CS2.Helper</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </AppLayout>
    </ReduxProvider>
  );
};

export default App;
