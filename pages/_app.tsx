import {Layout} from "@/components/layout/layout";
import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>CSGO Helper</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
