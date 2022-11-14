import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { TransactionInfo } from "../types/TransactionsTable";
import { getTransactions } from "./Transaction.api";

export const useGetTransactions = (
  pairId: string,
  exchange: string,
  page: number,
  perPage: number
): UseQueryResult<TransactionInfo[]> => {
  return useQuery(["TRANSACTIONS", pairId, exchange, page, perPage], () =>
    getTransactions(pairId, exchange, page, perPage)
  );
};
