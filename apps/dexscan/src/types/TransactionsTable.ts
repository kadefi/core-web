export type TransactionInfo = {
  requestkey: string;
  timestamp: string;
  type: "BUY" | "SELL";
  fromToken: {
    ticker: string;
    address: string;
    img: string;
    amount: number;
  };
  toToken: {
    ticker: string;
    address: string;
    img: string;
    amount: number;
  };
  amount: number;
  address: string;
  price: number;
};
