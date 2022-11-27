import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full bg-slate-900">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content="#3c0336" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="/static/datafeeds/udf/dist/bundle.js" />
          {/*<link*/}
          {/*  rel="stylesheet"*/}
          {/*  href="https://unpkg.com/flowbite@1.5.4/dist/flowbite.min.css"*/}
          {/*/>*/}
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
