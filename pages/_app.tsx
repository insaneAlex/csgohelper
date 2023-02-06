import {Layout} from "@/components/layout/layout";
import "@/styles/globals.scss";
import type {AppProps} from "next/app";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
