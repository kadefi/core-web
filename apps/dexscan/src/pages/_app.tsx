import "../../styles/global.css";
import "react-reflex/styles.css";

import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { initializeAmplitude, LayoutFn } from "ui";

const TITLE = "DEXScan by Kadefi.Money | DeFi Dashboard for Kadena";
const DESCRIPTION =
  "Track all tokens prices and performance across all Kadena's exchanges";
const IMAGE_URL = "https://dexscan.kadefi.money/assets/logo.png";
const TWITTER_USERNAME = "@kadefi_money";

interface MyAppProps extends AppProps<{ dehydratedState: DehydratedState }> {
  Component: LayoutFn;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

initializeAmplitude();

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
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
      <ThemeProvider theme={darkTheme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {/* @ts-ignore */}
              {getLayout(<Component {...pageProps} />)}
            </Hydrate>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
