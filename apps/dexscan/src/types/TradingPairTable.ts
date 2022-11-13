export type TradingPairInfo = {
  id: string;
  symbol: string;
  token: {
    name: string;
    address: string;
    img: string;
  };
  exchange: {
    name: string;
    img: string;
  };
  pair: string;
  price: number;
  pricePercChange1h: number;
  pricePercChange24h: number;
  pricePercChange7d: number;
  volume24h: number;
  marketCap: number | null;
};
