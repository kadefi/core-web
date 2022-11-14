import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import { useGetTradingPairInfo } from "../../api/TradingPair.queries";
import { getPageLayout } from "../Layout";

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

  if (!tradingPairInfo) {
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
        <ReflexSplitter />
        <ReflexElement className="right-pane">
          <div className="pane-content">Right Pane (resizeable)</div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

Pair.getLayout = getPageLayout;

export default Pair;
