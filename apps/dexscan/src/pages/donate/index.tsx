import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { Alert, Snackbar } from "@mui/material";
import { GetStaticProps } from "next";
import { useState } from "react";
import { NextPageWithLayout } from "ui";

import { getIntegrationInfo } from "../../api/Integration.api";
import { getPageLayout } from "../../layouts/Layout";
import { IntegrationInfo } from "../../types/Integration.type";
import { BrowserUtil } from "../../utils";

const DONATION_WALLET =
  "k:9d46e06675aaaea9803c8baadf0d26b9f933ed85f58f086d2bb700266bad6a65";

type Props = {
  integrations: IntegrationInfo;
};

const Donate: NextPageWithLayout<Props> = (props: Props) => {
  const { integrations } = props;

  const [open, setOpen] = useState(false);

  const getStatDisplay = (value: number, title: string) => {
    return (
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-sky-400">{value}</div>
        <div>{title}</div>
      </div>
    );
  };

  const handleWalletClick = () => {
    BrowserUtil.copyToClipboard(DONATION_WALLET);
    setOpen(true);
  };

  const wallet = (
    <div
      className="hover:ring-inset-2 flex w-full cursor-pointer items-center justify-between rounded-md bg-sky-600 py-2 px-4 font-semibold text-sky-100 transition transition duration-300 hover:ring-2 hover:ring-sky-400 hover:ring-offset-4 hover:ring-offset-slate-900"
      onClick={handleWalletClick}
    >
      <div className="truncate">{DONATION_WALLET}</div>
      <DocumentDuplicateIcon className="h-6 w-6" />
    </div>
  );

  const { projects, nfts, tokens } = integrations;

  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-auto p-8 text-slate-300">
      <div className="w-full max-w-2xl text-3xl font-bold text-sky-400">
        A Message From Kadefi.Money Founders
      </div>
      <div className="mt-4 flex w-full max-w-2xl flex-col items-start gap-4 text-sm">
        <div>👋 Hey there,</div>
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
          "Trading pairs with real-time price chart on DexScan"
        )}
        <div>
          We are extremely happy whenever someone shares about our platform, and
          we want to continue providing the best possible experience. We have
          many ideas and we would want to continue building in Kadena ecosystem
          as long as we can. However, as the usage of the platform increases and
          the server cost begins to mount up, we need your help to keep the
          platform running.
        </div>
        <div>
          If you are feeling generous, a donation (no matter the amount) would
          be of great help to us to keep Kadefi.Money and DexScan running and
          new integrations going. As a token of appreciation, we would give you
          a big virtual hug 🤗 (not the real one though, we are not that kind of
          platform 😉) You can find our wallet address here:
        </div>
        {wallet}
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
          Copied address to Clipboard
        </Alert>
      </Snackbar>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const integrations = await getIntegrationInfo();

  return {
    props: {
      integrations,
    },
  };
};

Donate.getLayout = getPageLayout;

export default Donate;
