import { ApiClient } from "api-client";

import {
  TransactionInfo,
  TransactionParams,
} from "../types/TransactionsTable.type";

export const getTransactions = async (params: TransactionParams) => {
  const response = await ApiClient.get(`/api/transactions`, {
    params: {
      id: params.pairId,
      exchange: params.exchangeId,
      limit: params.limit,
      fromTime: params.fromTime,
      toTime: params.toTime,
    },
  });

  return response.data as TransactionInfo[];
};
