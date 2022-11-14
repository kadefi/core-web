import { ApiClient } from "ui";

import { TradingPairInfo } from "../types/TradingPairTable";

export const getTradingPairs = async () => {
  console.log("getTradingPairs");
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
