import { useRouter } from "next/router";
import { DataTable } from "ui/components/DataTable";

import { useGetTradingPairs } from "../api/TradingPair.queries";
import { getPageLayout } from "../layouts/Layout";
import { TradingPairInfoUtil } from "../utils";

const headers = ["Token", "Price", "24h %", "7d %", "DEX Pair", "24h Vol"];

const Home = () => {
  const router = useRouter();

  const { data: tradingPairs } = useGetTradingPairs(true);

  if (!tradingPairs) {
    return null;
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-slate-300">
          Kadefi DEX Dashboard
        </h1>
      </div>
      <div className="mt-6 px-4 sm:px-6 md:px-8">
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
