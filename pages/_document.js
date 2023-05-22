// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";
import NextHead from "next/head";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <NextHead>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          </NextHead>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
