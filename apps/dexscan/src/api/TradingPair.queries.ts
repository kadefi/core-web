import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  REFETCH_INTERVAL_IN_MS,
  TRADING_PAIR_INFO_QUERY_KEY,
  TRADING_PAIR_QUERY_KEY,
} from "../constants";
import { TradingPairInfo } from "../types/TradingPairTable.type";
import { getTradingPairInfo, getTradingPairs } from "./TradingPair.api";

export const useGetTradingPairs = (): UseQueryResult<TradingPairInfo[]> => {
  return useQuery({
    queryKey: [TRADING_PAIR_QUERY_KEY],
    queryFn: () => getTradingPairs(),
    refetchInterval: REFETCH_INTERVAL_IN_MS,
  });
};

export const useGetTradingPairInfo = (
  pairId?: string,
  exchangeId?: string
): UseQueryResult<TradingPairInfo> => {
  return useQuery({
    queryKey: [TRADING_PAIR_INFO_QUERY_KEY, pairId, exchangeId],
    queryFn: () => getTradingPairInfo(pairId, exchangeId),
    refetchInterval: REFETCH_INTERVAL_IN_MS,
    enabled: Boolean(pairId && exchangeId),
  });
};
