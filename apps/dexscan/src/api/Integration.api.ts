import { ApiClient } from "ui";

import { IntegrationInfo } from "../types/Integration.type";

export const getIntegrationInfo = async () => {
  const response = await ApiClient.get("/integrations", {
    baseURL: process.env.NEXT_PUBLIC_KADEFI_MONEY_API_URL,
  });

  return response.data as IntegrationInfo;
};
