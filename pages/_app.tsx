import {Layout} from "@/components/layout/layout";
import {ReduxProvider} from "@/components/redux/provider";
import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ReduxProvider>
      <Layout>
        <Head>
          <title>CSGO Helper</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
};

export default App;
