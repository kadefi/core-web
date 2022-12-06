export type TradingPairInfo = {
  id: string;
  symbol: string;
  token0: {
    name: string;
    address: string;
    img: string;
  };
  token1: {
    name: string;
    address: string;
    img: string;
  };
  exchange: {
    name: "KADDEX" | "KDSWAP";
    img: string;
  };
  pair: string;
  price: number;
  pricePercChange24h: number;
  pricePercChange7d: number;
  volume24h: number;
  marketCap: number | null;
  totalSupply: number | null;
  circulatingSupply: number | null;
  allTimeHigh: number | null;
  allTimeLow: number | null;
  socials: {
    type: "website" | "telegram" | "twitter" | "discord" | "github";
    url: string;
  }[];
};
