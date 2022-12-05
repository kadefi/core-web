import axios, { AxiosError } from "axios";

const ApiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

ApiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers["x-request-start-time"] = new Date().getTime();
  }
  return config;
});

function interceptErrorResponse(error: AxiosError) {
  throw error;
}

ApiClient.interceptors.response.use((res) => res, interceptErrorResponse);

export default ApiClient;
