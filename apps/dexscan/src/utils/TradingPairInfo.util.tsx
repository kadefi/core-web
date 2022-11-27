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

export const getPercChangeDisplay = (percent: number) => {
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

export const getTradingPairRowComponents = (
  router: NextRouter,
  dataResponse: TradingPairInfo[]
) => {
  return dataResponse.map((data) => {
    const cells = [];

    const {
      id,
      token0,
      exchange,
      pair,
      price,
      pricePercChange24h,
      pricePercChange7d,
      volume24h,
    } = data;

    cells.push(
      <div className="flex items-center gap-2">
        <LogoImg src={token0.img} size="sm" />
        {token0.name}
      </div>
    );
    cells.push(<div>{NumberUtil.formatPrice(price)}</div>);
    cells.push(getPercChangeDisplay(pricePercChange24h));
    cells.push(getPercChangeDisplay(pricePercChange7d));
    cells.push(
      <div className="flex items-center gap-2">
        <LogoImg src={exchange.img} size="sm" />
        <div className="items-left flex flex-col">
          <div>{pair}</div>
          <div className="text-xs text-slate-500">{exchange.name}</div>
        </div>
      </div>
    );
    cells.push(<div>${numeral(round(volume24h, 0)).format("0,0")}</div>);

    const onRowClick = () => {
      router.push({
        pathname: "/pair",
        query: { id, exchange: exchange.name },
      });
    };

    return {
      cells,
      rowKey: `${id}-${exchange.name}`,
      onRowClick,
    };
  });
};
