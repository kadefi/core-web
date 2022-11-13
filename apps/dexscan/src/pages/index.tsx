import { useRouter } from "next/router";
import { DataTable } from "ui/components/DataTable";

import MOCK_TRADING_PAIRS from "../mocks/trading-pairs.json";
import { TradingPairInfoUtil } from "../utils";
import { getPageLayout } from "./Layout";

const headers = [
  "Token",
  "Price",
  "1h %",
  "24h %",
  "7d %",
  "DEX Pair",
  "24h Vol",
];

const Home = () => {
  const router = useRouter();

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-slate-300">
          Kadefi DEX Dashboard
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8">
        <DataTable
          headers={headers}
          rows={TradingPairInfoUtil.getTradingPairRowComponents(
            router,
            MOCK_TRADING_PAIRS
          )}
        />
      </div>
    </>
  );
};

Home.getLayout = getPageLayout;

export default Home;
