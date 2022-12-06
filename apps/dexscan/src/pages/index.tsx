import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { DehydratedStateProps, NextPageWithLayout } from "ui";
import { DataTable } from "ui/components/DataTable";

import { getTradingPairs } from "../api/TradingPair.api";
import { useGetTradingPairs } from "../api/TradingPair.queries";
import { REVALIDATE_DURATION_IN_S, TRADING_PAIR_QUERY_KEY } from "../constants";
import { getPageLayout } from "../layouts/Layout";
import { TradingPairInfoUtil } from "../utils";

const headers = ["Token Pair", "Price", "24H", "7D", "24H Vol"];

const Home: NextPageWithLayout<DehydratedStateProps> = () => {
  const router = useRouter();

  const { data: tradingPairs } = useGetTradingPairs();

  if (!tradingPairs) {
    return null;
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex-initial sm:px-6">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-sky-400">
            DEXScan Dashboard
          </h1>
          <div className="text-slate-200">by Kadefi.Money</div>
        </div>
      </div>
      <div className="flex-auto overflow-hidden px-2 sm:px-6">
        <DataTable
          headers={headers}
          rows={TradingPairInfoUtil.getTradingPairRowComponents(
            router,
            tradingPairs
          )}
          rounded
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  DehydratedStateProps
> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [TRADING_PAIR_QUERY_KEY],
    queryFn: () => getTradingPairs(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: REVALIDATE_DURATION_IN_S,
  };
};

Home.getLayout = getPageLayout;

export default Home;
