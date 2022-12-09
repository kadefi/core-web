import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { DateUtil } from "ui";

import { TRANSACTIONS_QUERY_KEY } from "../constants";
import {
  TransactionInfo,
  TransactionParams,
} from "../types/TransactionsTable.type";
import { getTransactions } from "./Transaction.api";

export const useGetTransactions = (
  params: TransactionParams
): UseInfiniteQueryResult<TransactionInfo[]> => {
  return useInfiniteQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, params],
    queryFn: ({ pageParam }) => getTransactions({ ...params, ...pageParam }),
    enabled: Boolean(params.pairId && params.exchangeId),
    getNextPageParam: (lastPage) => {
      const lastTxnTime = DateUtil.convertUTCToSecond(
        lastPage[lastPage.length - 1].timestamp
      );

      return {
        id: params.pairId,
        exchange: params.exchangeId,
        limit: params.limit,
        toTime: lastTxnTime,
      };
    },
  });
};
