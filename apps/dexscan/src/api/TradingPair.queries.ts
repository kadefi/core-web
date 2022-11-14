import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { TradingPairInfo } from "../types/TradingPairTable";
import { getTradingPairInfo, getTradingPairs } from "./TradingPair.api";

const REFETCH_INTERVAL = 60000;

export const useGetTradingPairs = (): UseQueryResult<TradingPairInfo[]> => {
  return useQuery(["TRADING_PAIRS"], () => getTradingPairs(), {
    refetchInterval: REFETCH_INTERVAL,
  });
};

export const useGetTradingPairInfo = (
  pairId: string,
  exchange: string
): UseQueryResult<TradingPairInfo> => {
  return useQuery(
    ["TRADING_PAIR_INFO", pairId, exchange],
    () => getTradingPairInfo(pairId, exchange),
    {
      refetchInterval: REFETCH_INTERVAL,
    }
  );
};
