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

const TRANSACTION_HEADERS = [
  "Transaction Date",
  "Type",
  "Price",
  "From",
  "To",
  "Address",
  "Explorer",
];

const Pair = () => {
  const router = useRouter();

  const { id, exchange } = router.query as { id: string; exchange: string };

  const { data: tradingPairInfo } = useGetTradingPairInfo(id, exchange);
  const { data: transactions } = useGetTransactions(id, exchange, 1, 20);

  if (!tradingPairInfo || !transactions) {
    return null;
  }

  return (
    <div className="h-full">
      <ReflexContainer orientation="horizontal" className="text-slate-50">
        <ReflexElement className="left-pane">
          <div className="pane-content h-full">
            <TVChartContainer symbol={tradingPairInfo.symbol} />
          </div>
        </ReflexElement>
        <ReflexSplitter className="border-2 border-slate-900" />
        <ReflexElement className="right-pane scrollbar-hide text-sm text-slate-50 ">
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
