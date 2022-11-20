import { ApiClient } from "ui";

import { TradingPairInfo } from "../types/TradingPairTable.type";

export const getTradingPairs = async () => {
  const response = await ApiClient.get(`/api/pairs`);

  return response.data as TradingPairInfo[];
};

export const getTradingPairInfo = async (pairId: string, exchange: string) => {
  const response = await ApiClient.get(`/api/pairs`, {
    params: {
      id: pairId,
      exchange,
    },
  });

  return response.data as TradingPairInfo;
};
