// pages/_app.js
import "../app/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  // Add your custom logic or components here

  return <Component {...pageProps} />;
}

export default MyApp;
