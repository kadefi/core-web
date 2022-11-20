import { ApiClient } from "ui";

import { TransactionInfo, TransactionParams } from "../types/TransactionsTable";

export const getTransactions = async (params: TransactionParams) => {
  console.log(params);

  const response = await ApiClient.get(`/api/transactions`, {
    params: {
      id: params.pairId,
      exchange: params.exchange,
      limit: params.limit,
      fromTime: params.fromTime,
      toTime: params.toTime,
    },
  });

  return response.data as TransactionInfo[];
};
