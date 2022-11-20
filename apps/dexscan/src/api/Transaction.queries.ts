import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { DateTime } from "luxon";

import {
  TransactionInfo,
  TransactionParams,
} from "../types/TransactionsTable.type";
import { getTransactions } from "./Transaction.api";

export const useGetTransactions = (
  params: TransactionParams
): UseInfiniteQueryResult<TransactionInfo[]> => {
  return useInfiniteQuery({
    queryKey: ["TRANSACTIONS", params],
    queryFn: ({ pageParam }) => getTransactions({ ...params, ...pageParam }),
    enabled: Boolean(params.pairId && params.exchange),
    getNextPageParam: (lastPage) => {
      const lastTxnTime = DateTime.fromISO(
        lastPage[lastPage.length - 1].timestamp
      ).toSeconds();

      return {
        id: params.pairId,
        exchange: params.exchange,
        limit: params.limit,
        toTime: lastTxnTime,
      };
    },
    getPreviousPageParam: (firstPage) => {
      const firstTxnTime = DateTime.fromISO(firstPage[0].timestamp).toSeconds();

      return {
        id: params.pairId,
        exchange: params.exchange,
        limit: 100,
        fromTime: firstTxnTime,
      };
    },
  });
};
