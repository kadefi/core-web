import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { Alert, Snackbar } from "@mui/material";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BrowserUtil, NextPageWithLayout } from "ui";

import { trackEvent } from "../../analytics/Analytics.util";
import { AmplitudeEvent } from "../../enums";
import { getPageLayout } from "../../layouts/Layout";
import { IntegrationInfo } from "../../types/Integration.type";

const DONATION_WALLET =
  "k:9d46e06675aaaea9803c8baadf0d26b9f933ed85f58f086d2bb700266bad6a65";

type Props = {
  integrations: IntegrationInfo;
};

const Donate: NextPageWithLayout<Props> = (props: Props) => {
  const { integrations } = props;

  const router = useRouter();

  // Amplitude
  useEffect(() => {
    trackEvent(AmplitudeEvent.PageVisit, {
      pathname: router.asPath,
    });
  }, [router.asPath]);

  const [open, setOpen] = useState(false);

  const getStatDisplay = (value: number, title: string) => {
    return (
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-teal-400">{value}</div>
        <div>{title}</div>
      </div>
    );
  };

  const handleWalletClick = () => {
    trackEvent(AmplitudeEvent.DonationAddressCopy);
    BrowserUtil.copyToClipboard(DONATION_WALLET);
    setOpen(true);
  };

  const wallet = (
    <div
      className="hover:ring-inset-2 flex w-full cursor-pointer items-center justify-between rounded-md bg-teal-600 py-2 px-4 font-semibold text-teal-50 transition transition duration-300 hover:ring-2 hover:ring-teal-400 hover:ring-offset-4 hover:ring-offset-slate-900"
      onClick={handleWalletClick}
    >
      <div className="flex-1 truncate">{DONATION_WALLET}</div>
      <DocumentDuplicateIcon className="h-6 w-6 flex-initial" />
    </div>
  );

  const { projects, nfts, tokens } = integrations;

  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-auto p-8 text-slate-300">
      <div className="w-full max-w-3xl text-3xl font-bold text-teal-400 lg:text-4xl">
        Donate to keep Kadefi.Money running
      </div>
      <div className="text mt-4 flex w-full max-w-3xl flex-col items-start gap-4">
        {wallet}
        <div className="flex items-center gap-2">
          <span className="text-lg">👋</span>
          <span>Hey there,</span>
        </div>
        <div>
          We want to take a quick moment to say thank you for your love and
          support of our little app. Thanks to your encouragement, we&apos;re
          able to keep pushing forward and making Kadefi.Money the best that it
          can be. We have come a long way, and here is a little summary of the
          work that we have accomplished together thus far:
        </div>
        {getStatDisplay(projects, "Project integrations")}
        {getStatDisplay(tokens, "Tokens supported on Kadefi.Money dashboard")}
        {getStatDisplay(nfts, "NFT Collections integrated with your wallet")}
        {getStatDisplay(
          32,
          "Trading pairs with real-time price chart on DEXScan"
        )}
        <div>
          We are extremely proud and happy hearing people talk about our
          platform, and we want to continue providing the best experience
          possible. We have many ideas and we would want to continue building in
          Kadena ecosystem as long as we can. However, as the usage of the
          platform increases and the server cost begins to mount up, we need
          your help to keep the platform running.
        </div>
        <div>
          If you are feeling generous, a donation (no matter the amount) would
          be of great help to us to keep Kadefi.Money and DEXScan running and
          new integrations going. As a token of appreciation, we would give you
          a big virtual hug 🤗 (not the real one though, we are not that kind of
          platform 😉)
        </div>
        <div>
          From the bottom of our hearts, we truly appreciate your support and we
          look forward to continuing serving you and the Kadena community in the
          future 🚀
        </div>
        <div>Sincerely,</div>
        <div>Kadefi.Money Founders</div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied Address to Clipboard
        </Alert>
      </Snackbar>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      integrations: {
        nfts: 50,
        tokens: 20,
        projects: 10,
      },
    },
  };
};

Donate.getLayout = getPageLayout;

export default Donate;
