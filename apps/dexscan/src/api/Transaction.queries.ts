import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { TransactionInfo } from "../types/TransactionsTable";
import { getTransactions } from "./Transaction.api";

export const useGetTransactions = (
  pairId?: string,
  exchange?: string,
  limit?: number,
  fromTime?: number,
  toTime?: number
): UseQueryResult<TransactionInfo[]> => {
  return useQuery({
    queryKey: ["TRANSACTIONS", pairId, exchange, limit, fromTime, toTime],
    queryFn: () => getTransactions(pairId, exchange, limit, fromTime, toTime),
    enabled: Boolean(pairId && exchange),
  });
};
