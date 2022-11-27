import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { TradingPairInfo } from "../types/TradingPairTable.type";
import { getTradingPairInfo, getTradingPairs } from "./TradingPair.api";

const REFETCH_INTERVAL = 20000;

export const useGetTradingPairs = (): UseQueryResult<TradingPairInfo[]> => {
  return useQuery(["TRADING_PAIRS"], () => getTradingPairs(), {
    refetchInterval: REFETCH_INTERVAL,
  });
};

export const useGetTradingPairInfo = (
  pairId?: string,
  exchange?: string
): UseQueryResult<TradingPairInfo> => {
  return useQuery({
    queryKey: ["TRADING_PAIR_INFO", pairId, exchange],
    queryFn: () => getTradingPairInfo(pairId, exchange),
    refetchInterval: REFETCH_INTERVAL,
    enabled: Boolean(pairId && exchange),
  });
};
