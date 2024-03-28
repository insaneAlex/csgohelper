import Document, {Html, Head, Main, NextScript} from 'next/document';
import {Analytics} from '@vercel/analytics/react';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
