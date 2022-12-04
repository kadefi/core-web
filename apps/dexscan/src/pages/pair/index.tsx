import { InformationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import round from "lodash/round";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import numeral from "numeral";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { DataTable, LoadingSpinner, LogoImg, NumberUtil, Tooltip } from "ui";
import { Breakpoint } from "ui/constants";
import { useMinWidth } from "ui/hooks";

import { useGetTradingPairInfo } from "../../api/TradingPair.queries";
import { useGetTransactions } from "../../api/Transaction.queries";
import DiscordLogo from "../../assets/svgs/discord.svg";
import GithubLogo from "../../assets/svgs/github.svg";
import TelegramLogo from "../../assets/svgs/telegram.svg";
import TwitterLogo from "../../assets/svgs/twitter.svg";
import WebsiteLogo from "../../assets/svgs/website.svg";
import { getPageLayout } from "../../layouts/Layout";
import { TradingPairInfoUtil, TransactionInfoUtil } from "../../utils";

const TVChartContainer = dynamic(
  // @ts-ignore
  () =>
    import("../../components/TVChartContainer").then(
      (mod) => mod.TVChartContainer
    ),
  { ssr: false }
);

const SocialLogos = {
  website: <WebsiteLogo />,
  twitter: <TwitterLogo />,
  discord: <DiscordLogo />,
  telegram: <TelegramLogo />,
  github: <GithubLogo className="text-slate-200" />,
};

const Pair = () => {
  const router = useRouter();

  const { id, exchange } = router.query as { id: string; exchange: string };

  const { data: tradingPairInfo } = useGetTradingPairInfo(id, exchange);

  const { ref: tableBottomRef, inView } = useInView({});

  const lgAndAbove = useMinWidth(Breakpoint.lg);

  const {
    data: transactions,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
  } = useGetTransactions({ pairId: id, exchange, limit: 50 });

  useEffect(() => {
    const interval = setInterval(() => fetchPreviousPage(), 20000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchPreviousPage]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const [currentTab, setCurrentTab] = useState("Chart");

  if (!tradingPairInfo) {
    return null;
  }

  const {
    token0,
    token1,
    price,
    pricePercChange24h,
    pricePercChange7d,
    volume24h,
    socials,
    allTimeLow,
    allTimeHigh,
    totalSupply,
    circulatingSupply,
  } = tradingPairInfo;

  const socialUrls = new Map();

  socials.forEach((social) => {
    socialUrls.set(social.type, social.url);
  });

  const formatStatsInfo = (
    title: string,
    value: ReactNode,
    tooltipText?: string
  ) => {
    return (
      <div className="text-sm lg:text-xs">
        <div className="mb-1 flex items-center gap-[2px] text-slate-500">
          {title}
          {tooltipText && (
            <Tooltip
              content={tooltipText}
              tooltipClassname="m-[6px]"
              placement={"top"}
            >
              <InformationCircleIcon className="h-4 w-4" />
            </Tooltip>
          )}
        </div>
        <div className="text-slate-300">{value}</div>
      </div>
    );
  };

  const socialInfo = (
    <div className="my-1 flex gap-2">
      {Object.keys(SocialLogos).map((social) => {
        if (socialUrls.has(social)) {
          return (
            <a
              key={social}
              href={socialUrls.get(social)}
              target="_blank"
              rel="noreferrer"
            >
              <Tooltip content={social} tooltipClassname="capitalize">
                <div className="h-5 w-5 cursor-pointer lg:h-6 lg:w-6">
                  {SocialLogos[social]}
                </div>
              </Tooltip>
            </a>
          );
        } else {
          return null;
        }
      })}
    </div>
  );

  const tokenStats = (
    <div className="mx-4 flex flex-col gap-3 overflow-auto rounded-md bg-slate-800/70 p-4 shadow lg:mx-0 lg:w-full">
      {formatStatsInfo(
        "24h Volume",
        <div>${numeral(round(volume24h, 0)).format("0,0")}</div>
      )}
      {formatStatsInfo(
        "Market Cap",
        <div>
          {circulatingSupply && price
            ? numeral(round(circulatingSupply * price, 0)).format("0,0")
            : "-"}
        </div>,
        "Current Price * Circulating Supply"
      )}
      {formatStatsInfo(
        "Fully Diluted Market Cap",
        <div>
          $
          {totalSupply && price
            ? numeral(round(totalSupply * price, 0)).format("0,0")
            : "-"}
        </div>,
        "Current Price * Total Supply"
      )}
      {formatStatsInfo(
        "Circulating Supply",
        <div>
          {circulatingSupply
            ? numeral(round(circulatingSupply, 0)).format("0,0")
            : "-"}
        </div>
      )}
      {formatStatsInfo(
        "Total Supply",
        <div>
          {totalSupply ? numeral(round(totalSupply, 0)).format("0,0") : "-"}
        </div>,
        "Max Supply - Burned Tokens"
      )}
      {formatStatsInfo(
        "All-Time Low",
        <div>{allTimeLow ? NumberUtil.formatPrice(allTimeLow) : "-"}</div>
      )}
      {formatStatsInfo(
        "All-Time High",
        <div>{allTimeHigh ? NumberUtil.formatPrice(allTimeHigh) : "-"}</div>
      )}
    </div>
  );

  const tokenInformation = (
    <div className="flex h-full w-full items-center justify-between p-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2 lg:overflow-auto lg:px-6 lg:py-4">
      <div className="flex items-center gap-2">
        <LogoImg src={token0.img} size="md" />
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-2">
            <div className="flex items-center gap-1 text-xl  lg:text-2xl">
              <span className="text-slate-200">{token0.name}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-500">{token1.name}</span>
            </div>
          </div>
          <div className="block lg:hidden">{socialInfo}</div>
        </div>
      </div>
      <div className="flex flex-col items-end lg:w-full lg:items-start lg:gap-2">
        <div className="mb-1 text-xl font-bold text-slate-200 lg:text-3xl">
          {NumberUtil.formatPrice(price, 12)}
        </div>
        <div className="flex items-center gap-1 rounded-md bg-slate-800/70 py-1 px-2 text-xs lg:w-full lg:px-4 lg:py-2">
          <span className="text-slate-500">24h</span>
          <span>
            {TradingPairInfoUtil.getPercChangeDisplay(pricePercChange24h)}
          </span>
          <span className="ml-2 text-slate-500">7d</span>
          <span>
            {TradingPairInfoUtil.getPercChangeDisplay(pricePercChange7d)}
          </span>
        </div>
      </div>
      <div className="hidden lg:block">{socialInfo}</div>
      <div className="hidden lg:block lg:w-full">{tokenStats}</div>
    </div>
  );

  const tokenChart = (
    <div className="relative h-full w-full">
      <TVChartContainer symbol={tradingPairInfo.symbol} />
    </div>
  );

  const tokenTransactions = (
    <>
      {isLoading || !transactions ? (
        <div className="flex h-full w-full items-center justify-center text-slate-500">
          <LoadingSpinner />
          Loading transactions
        </div>
      ) : (
        <div className="relative h-full overflow-hidden">
          <DataTable
            headers={TransactionInfoUtil.getTransactionHeaders(
              transactions.pages
            )}
            rows={TransactionInfoUtil.getTransactionRowComponents(
              transactions.pages
            )}
            tableBottomRef={tableBottomRef}
          />
          {inView && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-slate-800 px-4 py-2 text-center text-slate-50">
              <LoadingSpinner />
              Loading more transactions...
            </div>
          )}
        </div>
      )}
    </>
  );

  const desktopDisplay = (
    <ReflexContainer
      orientation="horizontal"
      className="hidden md:flex md:grow md:text-slate-50"
    >
      <ReflexElement className="left-pane overflow-hidden" flex={0.6}>
        <div className="h-full">{tokenChart}</div>
      </ReflexElement>
      <ReflexSplitter className="z-0 border-2 border-slate-700" />
      <ReflexElement
        className="right-pane scrollbar-hide text-sm text-slate-50"
        flex={0.4}
      >
        <div className="pane-content relative h-full overflow-hidden">
          {tokenTransactions}
        </div>
      </ReflexElement>
    </ReflexContainer>
  );

  const tabs = [
    { name: "Chart", component: tokenChart },
    { name: "Transactions", component: tokenTransactions },
    { name: "Statistics", component: tokenStats },
  ];

  const getCurrentTabComponent = () => {
    for (const tab of tabs) {
      if (tab.name === currentTab) {
        return tab.component;
      }
    }

    return null;
  };

  const mobileDisplay = (
    <div className="flex h-full flex-col">
      <nav
        className="my-2 flex w-full flex-initial justify-center px-4"
        aria-label="Tabs"
      >
        <div className="flex w-full gap-1 rounded-md border border-slate-800">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={clsx(
                currentTab === tab.name
                  ? "bg-slate-700 text-slate-200"
                  : "text-slate-500 hover:text-slate-200",
                "flex-1 cursor-pointer rounded-md py-2 text-center text-sm font-medium"
              )}
              aria-current={currentTab === tab.name ? "page" : undefined}
              onClick={() => setCurrentTab(tab.name)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </nav>
      <div className="flex-1 basis-0 overflow-hidden">
        {getCurrentTabComponent()}
      </div>
    </div>
  );

  return (
    <div className="h-full">
      <div className="flex h-full w-full flex-col lg:flex-row">
        <div className="grow-0 border-b border-slate-800 lg:h-full lg:w-96 lg:border-r lg:border-b-0">
          {tokenInformation}
        </div>
        {lgAndAbove ? desktopDisplay : mobileDisplay}
      </div>
    </div>
  );
};

Pair.getLayout = getPageLayout;

export default Pair;
