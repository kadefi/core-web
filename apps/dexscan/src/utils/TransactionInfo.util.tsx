import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { LogoImg, NumberUtil, StringUtil } from "ui";

import { TransactionInfo } from "../types/TransactionsTable";

export const getTransactionRowComponents = (
  dataResponse: TransactionInfo[]
) => {
  return dataResponse.map((data) => {
    const cells = [];

    const { timestamp, type, price, fromToken, toToken, address, requestkey } =
      data;

    const isBuyTxn = type === "BUY";
    const textColor = isBuyTxn ? "text-green-200" : "text-red-200";
    const typeTextColor = isBuyTxn ? "text-green-500" : "text-red-500";

    // Date
    cells.push(
      <div className={clsx(textColor)}>
        {new Date(timestamp).toLocaleString()}
      </div>
    );

    // Type
    cells.push(
      <div className={clsx(typeTextColor, "font-medium")}>{type}</div>
    );

    // Price
    cells.push(
      <div className={clsx(textColor)}>{NumberUtil.formatPrice(price)}</div>
    );

    // From
    cells.push(
      <div className={clsx("flex items-center gap-2", textColor)}>
        <LogoImg src={fromToken.img} size="sm" />
        {fromToken.ticker}
      </div>
    );

    // To
    cells.push(
      <div className={clsx("flex items-center gap-2", textColor)}>
        <LogoImg src={toToken.img} size="sm" />
        {toToken.ticker}
      </div>
    );

    // Address
    cells.push(
      <a
        href={`https://kadefi.money/dashboard/${address}`}
        target="_blank"
        className={clsx(textColor, "flex items-center gap-1")}
        rel="noreferrer"
      >
        {StringUtil.shortenAddress(address)}
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
    );

    // Txn
    cells.push(
      <a
        href={`https://explorer.chainweb.com/mainnet/tx/${requestkey}`}
        target="_blank"
        className={clsx(textColor, "flex items-center gap-1")}
        rel="noreferrer"
      >
        {StringUtil.shortenAddress(requestkey, 4, 2)}
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
    );

    return {
      cells,
    };
  });
};
