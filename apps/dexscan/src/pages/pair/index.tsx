import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { DataTable } from "ui";

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
  const { data: transactions } = useGetTransactions(id, exchange, 50);

  if (!tradingPairInfo || !transactions) {
    return null;
  }

  const TRANSACTION_HEADERS = [
    "Date",
    "Type",
    "Price",
    transactions.length > 0 ? transactions[0].token0.ticker : "Token 1",
    transactions.length > 0 ? transactions[0].token1.ticker : "Token 2",
    "Value",
    "Address",
    "Explorer",
  ];

  return (
    <div className="h-full">
      <ReflexContainer orientation="horizontal" className="text-slate-50">
        <ReflexElement className="left-pane" flex={0.65}>
          <div className="pane-content h-full">
            <TVChartContainer symbol={tradingPairInfo.symbol} />
          </div>
        </ReflexElement>
        <ReflexSplitter className="border-2 border-slate-700" />
        <ReflexElement
          className="right-pane scrollbar-hide text-sm text-slate-50"
          flex={0.35}
        >
          <div className="pane-content ">
            <DataTable
              headers={TRANSACTION_HEADERS}
              rows={TransactionInfoUtil.getTransactionRowComponents(
                transactions
              )}
            />
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

Pair.getLayout = getPageLayout;

export default Pair;
