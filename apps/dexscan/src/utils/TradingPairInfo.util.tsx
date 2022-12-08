import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import round from "lodash/round";
import { NextRouter } from "next/router";
import numeral from "numeral";
import { LogoImg, NumberUtil } from "ui";

import { TradingPairInfo } from "../types/TradingPairTable.type";
import { RouteUtil } from ".";

export const getPriceChangeDisplay = (percent: number) => {
  let icon = null;
  let color = "text-slate-500";

  if (percent > 0) {
    icon = <ArrowUpRightIcon className="h-4 w-4" />;
    color = "text-green-500";
  } else if (percent < 0) {
    icon = <ArrowDownRightIcon className="h-4 w-4" />;
    color = "text-red-500";
  }

  return (
    <div className={clsx("flex items-center", color)}>
      {icon}
      {NumberUtil.formatPercentage(Math.abs(percent))}
    </div>
  );
};

export const renderTokenPair = (dataItem: TradingPairInfo) => {
  const { token0, token1, exchange } = dataItem;

  return (
    <div className="flex items-center gap-2">
      <LogoImg src={token0.img} size="sm" />
      <div className="flex items-center gap-2">
        <div className="items-left flex flex-col">
          <div>
            <span>{token0.name}</span>
            <span className="text-slate-500">{` / ${token1.name}`}</span>
          </div>
          <div className="text-xs text-[10px] text-slate-500">
            {exchange.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export const renderTokenPrice = (dataItem: TradingPairInfo) => {
  return <div>{NumberUtil.formatPrice(dataItem.price)}</div>;
};

export const render24hPriceChange = (dataItem: TradingPairInfo) => {
  return getPriceChangeDisplay(dataItem.pricePercChange24h);
};

export const render7dPriceChange = (dataItem: TradingPairInfo) => {
  return getPriceChangeDisplay(dataItem.pricePercChange7d);
};

export const render24hVolume = (dataItem: TradingPairInfo) => {
  return <div>${numeral(round(dataItem.volume24h, 0)).format("0,0")}</div>;
};

export const getRowKey = (dataItem: TradingPairInfo) => {
  return `${dataItem.id}-${dataItem.exchange.name}`;
};

export const getRowClick = (router: NextRouter) => {
  return (dataItem: TradingPairInfo) => {
    router.push({
      pathname: RouteUtil.getTradingPairPath(
        dataItem.id,
        dataItem.exchange.name
      ),
    });
  };
};

export const getLinkToExchange = (
  exchange: "KADDEX" | "KDSWAP",
  token0: string,
  token1: string
): string => {
  if (exchange === "KADDEX") {
    return `https://swap.kaddex.com/?token0=${token1}&token1=${token0}`;
  }

  if (exchange === "KDSWAP") {
    return `https://www.kdswap.exchange/swap/${token1}/${token0}`;
  }

  return "";
};
