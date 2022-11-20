import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { LogoImg, NumberUtil, StringUtil } from "ui";
import { DataTableRows } from "ui/components/DataTable/DataTable.type";

import {
  TransactionInfo,
  TransactionTokenInfo,
} from "../types/TransactionsTable.type";

const TxnDate = ({
  color,
  timestamp,
}: {
  color: string;
  timestamp: string;
}) => {
  return (
    <div className={clsx(color)}>{new Date(timestamp).toLocaleString()}</div>
  );
};

const TxnType = ({ color, type }: { color: string; type: string }) => {
  return <div className={clsx(color, "font-medium")}>{type}</div>;
};

const TxnPrice = ({ color, price }: { color: string; price: number }) => {
  return <div className={clsx(color)}>${NumberUtil.formatPrice(price)}</div>;
};

const TxnToken = ({
  color,
  token,
}: {
  color: string;
  token: TransactionTokenInfo;
}) => {
  return (
    <div className={clsx("flex items-center gap-2", color)}>
      <LogoImg src={token.img} size="sm" />
      {NumberUtil.formatTokenAmount(token.amount)}
    </div>
  );
};

const TxnValue = ({ color, amount }: { color: string; amount: number }) => {
  return <div className={clsx(color)}>${NumberUtil.formatPrice(amount)}</div>;
};

const TxnWalletLink = ({
  color,
  walletAddress,
}: {
  color: string;
  walletAddress: string;
}) => {
  return (
    <a
      href={`https://kadefi.money/dashboard/${walletAddress}`}
      target="_blank"
      className={clsx(color, "flex items-center gap-1")}
      rel="noreferrer"
    >
      {StringUtil.shortenAddress(walletAddress, 4, 2)}
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </a>
  );
};

const TxnExplorerLink = ({
  color,
  requestkey,
}: {
  color: string;
  requestkey: string;
}) => {
  return (
    <a
      href={`https://explorer.chainweb.com/mainnet/tx/${requestkey}`}
      target="_blank"
      className={clsx(color, "flex items-center gap-1")}
      rel="noreferrer"
    >
      {StringUtil.shortenAddress(requestkey, 4, 2)}
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </a>
  );
};

export const getTransactionHeaders = (pagesResponse: TransactionInfo[][]) => {
  if (
    !pagesResponse ||
    pagesResponse.length === 0 ||
    pagesResponse[0].length === 0
  ) {
    return [];
  }

  const ticker1 = pagesResponse[0][0].token0.ticker;
  const ticker2 = pagesResponse[0][0].token0.ticker;

  return [
    "Date",
    "Type",
    "Price",
    ticker1,
    ticker2,
    "Value",
    "Address",
    "Explorer",
  ];
};

export const getTransactionRowComponents = (
  pagesResponse: TransactionInfo[][]
): DataTableRows => {
  const rows: DataTableRows = [];

  pagesResponse.forEach((pageResponse) => {
    pageResponse.forEach((pageData) => {
      const cells = [];
      const {
        timestamp,
        type,
        price,
        token0,
        token1,
        address,
        requestkey,
        amount,
      } = pageData;

      const isBuyTxn = type === "BUY";
      const color = isBuyTxn ? "text-green-200" : "text-red-300";
      const typeColor = isBuyTxn ? "text-green-500" : "text-red-500";

      cells.push(<TxnDate color={color} timestamp={timestamp} />);
      cells.push(<TxnType color={typeColor} type={type} />);
      cells.push(<TxnPrice color={color} price={price} />);
      cells.push(<TxnToken color={color} token={token0} />);
      cells.push(<TxnToken color={color} token={token1} />);
      cells.push(<TxnValue color={color} amount={amount} />);
      cells.push(<TxnWalletLink color={color} walletAddress={address} />);
      cells.push(<TxnExplorerLink color={color} requestkey={requestkey} />);

      rows.push({
        cells,
        rowKey: requestkey,
      });
    });
  });

  return rows;
};
