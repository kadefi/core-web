import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { DataTable, LoadingSpinner, LogoImg, NumberUtil } from "ui";

import { useGetTradingPairInfo } from "../../api/TradingPair.queries";
import { useGetTransactions } from "../../api/Transaction.queries";
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

const Pair = () => {
  const router = useRouter();

  const { id, exchange } = router.query as { id: string; exchange: string };

  const { data: tradingPairInfo } = useGetTradingPairInfo(id, exchange);

  const {
    data: transactions,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
  } = useGetTransactions({ pairId: id, exchange, limit: 25 });

  useEffect(() => {
    const interval = setInterval(() => fetchPreviousPage(), 10000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchPreviousPage]);

  if (!tradingPairInfo) {
    return null;
  }

  const { token, price, pricePercChange24h, pricePercChange7d } =
    tradingPairInfo;

  return (
    <div className="h-full">
      <ReflexContainer orientation="horizontal" className="text-slate-50">
        <ReflexElement
          className="left-pane"
          minSize={64}
          maxSize={64}
          size={64}
        >
          <div className="pane-content flex h-full items-center justify-between border-b border-slate-800 p-3">
            <div className="flex items-center gap-2">
              <LogoImg src={token.img} size="md" />
              <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-2">
                <div className="flex items-center gap-1 text-xl lg:text-2xl">
                  <span className="font-bold text-slate-200">{token.name}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-400">KDA</span>
                </div>
                <div className="rounded-md bg-black py-1 px-2 text-xs text-slate-500 lg:text-sm">
                  {exchange}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end lg:flex-row-reverse lg:items-center lg:gap-4">
              <div className="text-xl lg:text-2xl lg:font-bold">
                ${NumberUtil.formatPrice(price)}
              </div>
              <div className="flex items-center gap-1 rounded-md bg-black py-1 px-2 text-xs lg:text-sm">
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
          </div>
        </ReflexElement>
        <ReflexElement className="right-pane">
          <ReflexContainer orientation="horizontal">
            <ReflexElement className="left-pane" flex={0.65}>
              <div className="pane-content relative h-full">
                <TVChartContainer symbol={tradingPairInfo.symbol} />
              </div>
            </ReflexElement>
            <ReflexSplitter className="border-2 border-slate-700" />
            <ReflexElement
              className="right-pane scrollbar-hide text-sm text-slate-50"
              flex={0.35}
            >
              <div className="pane-content h-full">
                {isLoading ? (
                  <div className="flex h-full w-full items-center justify-center text-slate-500">
                    <LoadingSpinner />
                    Loading transactions
                  </div>
                ) : (
                  <div>
                    <DataTable
                      headers={TransactionInfoUtil.getTransactionHeaders(
                        transactions.pages
                      )}
                      rows={TransactionInfoUtil.getTransactionRowComponents(
                        transactions.pages
                      )}
                    />
                    <div
                      className="flex h-10 w-full cursor-pointer items-center justify-center bg-slate-800/50 transition hover:bg-slate-800"
                      onClick={() => fetchNextPage()}
                    >
                      {isFetchingNextPage ? (
                        <div className="flex items-center">
                          <LoadingSpinner size="sm" />
                          <div className="text-slate-500">Fetching...</div>
                        </div>
                      ) : (
                        <div className="text-slate-400">
                          Load more transactions
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

Pair.getLayout = getPageLayout;

export default Pair;
