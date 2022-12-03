import { useRouter } from "next/router";
import { DataTable } from "ui/components/DataTable";

import { useGetTradingPairs } from "../api/TradingPair.queries";
import { getPageLayout } from "../layouts/Layout";
import { TradingPairInfoUtil } from "../utils";

const headers = ["Token", "Price", "24h %", "7d %", "DEX Pair", "24h Vol"];

const Home = () => {
  const router = useRouter();

  const { data: tradingPairs } = useGetTradingPairs();

  if (!tradingPairs) {
    return null;
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex-initial sm:px-6">
        <h1 className="p-4 text-2xl font-semibold text-slate-300">
          Kadefi DEX Dashboard
        </h1>
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

Home.getLayout = getPageLayout;

export default Home;
