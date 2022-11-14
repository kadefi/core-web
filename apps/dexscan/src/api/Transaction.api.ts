import { ApiClient } from "ui";

import { TransactionInfo } from "../types/TransactionsTable";

export const getTransactions = async (
  pairId: string,
  exchange: string,
  page: number,
  perPage: number
) => {
  const response = await ApiClient.get(`/api/transactions`, {
    params: {
      id: pairId,
      exchange,
      page,
      perpage: perPage,
    },
  });

  return response.data as TransactionInfo[];
};
