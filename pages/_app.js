// pages/_app.js
import { MCQProvider } from "@/context/MCQProvider";
import "../app/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  // Add your custom logic or components here

  return (
    <>
      <MCQProvider>
        <Component {...pageProps} />;
      </MCQProvider>
    </>
  );
}

export default MyApp;
