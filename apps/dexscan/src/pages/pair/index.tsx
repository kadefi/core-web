import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { DataTable, LoadingSpinner } from "ui";

import { useGetTradingPairInfo } from "../../api/TradingPair.queries";
import { useGetTransactions } from "../../api/Transaction.queries";
import { getPageLayout } from "../../layouts/Layout";
import { TransactionInfoUtil } from "../../utils";

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

  return (
    <div className="h-full">
      <ReflexContainer orientation="horizontal" className="text-slate-50">
        <ReflexElement className="left-pane" flex={0.65}>
          <div className="pane-content h-full">
            {tradingPairInfo ? (
              <TVChartContainer symbol={tradingPairInfo.symbol} />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                <LoadingSpinner />
                Loading chart data
              </div>
            )}
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
                <div
                  className="flex h-10 w-full cursor-pointer items-center justify-center bg-slate-800/50 transition hover:bg-slate-800"
                  onClick={() => fetchPreviousPage()}
                >
                  {isFetchingNextPage ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" />
                      <div className="text-slate-500">Fetching...</div>
                    </div>
                  ) : (
                    <div className="text-slate-400">Load new transactions</div>
                  )}
                </div>
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
                    <div className="text-slate-400">Load more transactions</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

Pair.getLayout = getPageLayout;

export default Pair;
