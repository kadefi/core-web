import { GetStaticProps } from "next";
import { NextPageWithLayout } from "ui";

import { getIntegrationInfo } from "../../api/Integration.api";
import { getPageLayout } from "../../layouts/Layout";
import { IntegrationInfo } from "../../types/Integration.type";

type Props = {
  integrations: IntegrationInfo;
};

const Donate: NextPageWithLayout<Props> = (props: Props) => {
  const { integrations } = props;

  const getStatDisplay = (value: number, title: string) => {
    return (
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-pink-600">{value}</div>
        <div>{title}</div>
      </div>
    );
  };

  const { projects, nfts, tokens } = integrations;

  return (
    <div className="flex h-full w-full flex-col items-center justify-start overflow-auto p-8 text-slate-300">
      <div className="w-full max-w-2xl text-3xl font-bold text-pink-600">
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
        <div className="w-full cursor-pointer truncate rounded-md bg-pink-700 py-2 px-4">
          k:9d46e06675aaaea9803c8baadf0d26b9f933ed85f58f086d2bb700266bad6a65
        </div>
        <div>
          From the bottom of our hearts, we truly appreciate your support and we
          look forward to continuing serving you and the Kadena community in the
          future 🚀
        </div>
        <div>Sincerely,</div>
        <div>Kadefi.Money Founders</div>
      </div>
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
