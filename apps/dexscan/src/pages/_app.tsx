import "../../styles/global.css";
import "react-reflex/styles.css";

import { StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Page } from "ui";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const TITLE = "Kadefi Money DexScan | DeFi Dashboard for Kadena";
const DESCRIPTION =
  "DexScan by Kadefi Money. Track all tokens performance across all Kadena's exchanges";
const IMAGE_URL = "https://kadefi.money/assets/logo.png";
const TWITTER_USERNAME = "@kadefi_money";

interface MyAppProps extends AppProps {
  Component: Page;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE_URL} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={TWITTER_USERNAME} />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="twitter:image" content={IMAGE_URL} />
      </Head>
      <StyledEngineProvider injectFirst>
        {getLayout(<Component {...pageProps} />)}
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
