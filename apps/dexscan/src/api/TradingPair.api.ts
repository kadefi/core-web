import { ApiClient } from "api-client";

import { TradingPairInfo } from "../types/TradingPairTable.type";

export const getTradingPairs = async () => {
  const response = await ApiClient.get(`/api/pairs`);

  return response.data as TradingPairInfo[];
};

export const getTradingPairInfo = async (
  pairId: string,
  exchangeId: string
) => {
  const response = await ApiClient.get(`/api/pairs`, {
    params: {
      id: pairId,
      exchange: exchangeId,
    },
  });

  return response.data as TradingPairInfo;
};
