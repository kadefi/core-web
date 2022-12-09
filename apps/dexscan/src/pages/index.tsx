import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { DehydratedStateProps, NextPageWithLayout } from "ui";
import { DataTable } from "ui/components/DataTable";
import { ColumnDef, RowDef } from "ui/components/DataTable/DataTable.type";
import { SortDirection } from "ui/enums";

import { getTradingPairs } from "../api/TradingPair.api";
import { useGetTradingPairs } from "../api/TradingPair.queries";
import { REVALIDATE_DURATION_IN_S, TRADING_PAIR_QUERY_KEY } from "../constants";
import { getPageLayout } from "../layouts/Layout";
import { TradingPairInfo } from "../types/TradingPairTable.type";
import { TradingPairInfoUtil } from "../utils";

enum ColumnKey {
  TokenPair = "token-pair",
  Price = "price",
  Price24h = "price-24h",
  Price7d = "price-7d",
  Vol24h = "vol-24h",
}

const tradingPairColumnDefs: ColumnDef<TradingPairInfo>[] = [
  {
    name: "Token Pair",
    columnKey: ColumnKey.TokenPair,
    renderCell: TradingPairInfoUtil.renderTokenPair,
    getCompareValue: (item: TradingPairInfo) => item.token0.name,
  },
  {
    name: "Price",
    columnKey: ColumnKey.Price,
    renderCell: TradingPairInfoUtil.renderTokenPrice,
    getCompareValue: (item: TradingPairInfo) => item.price,
  },
  {
    name: "24H",
    columnKey: ColumnKey.Price24h,
    renderCell: TradingPairInfoUtil.render24hPriceChange,
    getCompareValue: (item: TradingPairInfo) => item.pricePercChange24h,
  },
  {
    name: "7D",
    columnKey: ColumnKey.Price7d,
    renderCell: TradingPairInfoUtil.render7dPriceChange,
    getCompareValue: (item: TradingPairInfo) => item.pricePercChange7d,
  },
  {
    name: "24H Vol",
    columnKey: ColumnKey.Vol24h,
    renderCell: TradingPairInfoUtil.render24hVolume,
    getCompareValue: (item: TradingPairInfo) => item.volume24h,
  },
];

const Home: NextPageWithLayout<DehydratedStateProps> = () => {
  const router = useRouter();

  const { data: tradingPairs } = useGetTradingPairs();

  if (!tradingPairs) {
    return null;
  }

  const tradingPairRowDef: RowDef<TradingPairInfo> = {
    getRowKey: TradingPairInfoUtil.getRowKey,
    getRowClick: TradingPairInfoUtil.getRowClick(router),
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex-initial sm:px-6">
        <div className="py-4 px-2 sm:px-0">
          <h1 className="text-2xl font-bold text-slate-50">
            DEXSCAN Dashboard
          </h1>
          {TradingPairInfoUtil.getTradingNotice()}
        </div>
      </div>
      <div className="flex-auto overflow-hidden px-2 pb-4 sm:px-6">
        <DataTable
          dataSource={tradingPairs}
          columnDefs={tradingPairColumnDefs}
          rowDef={tradingPairRowDef}
          defaultSortedColumn={ColumnKey.Vol24h}
          defaultSortedDirection={SortDirection.Desc}
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
