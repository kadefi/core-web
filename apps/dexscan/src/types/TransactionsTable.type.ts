export type TransactionInfo = {
  requestkey: string;
  timestamp: string;
  type: "BUY" | "SELL";
  token0: TransactionTokenInfo;
  token1: TransactionTokenInfo;
  amount: number;
  address: string;
  price: number;
  eventId: number;
};

export type TransactionTokenInfo = {
  ticker: string;
  address: string;
  img: string;
  amount: number;
};

export type TransactionParams = {
  pairId?: string;
  exchange?: string;
  limit?: number;
  fromTime?: number;
  toTime?: number;
};
