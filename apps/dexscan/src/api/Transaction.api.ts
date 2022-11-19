import { ApiClient } from "ui";

import { TransactionInfo } from "../types/TransactionsTable";

export const getTransactions = async (
  pairId: string,
  exchange: string,
  limit?: number,
  fromTime?: number,
  toTime?: number
) => {
  const response = await ApiClient.get(`/api/transactions`, {
    params: {
      id: pairId,
      exchange,
      limit,
      fromTime,
      toTime,
    },
  });

  return response.data as TransactionInfo[];
};
