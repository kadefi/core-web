import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { LogoImg, NumberUtil, StringUtil } from "ui";
import { DataTableRows } from "ui/components/DataTable/DataTable.type";

import KadenaExplorerLogo from "../assets/pngs/kadena-block-explorer.png";
import UnmarshalLogo from "../assets/svgs/unmarshal.svg";
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
  return <div className={clsx(color)}>{NumberUtil.formatPrice(price)}</div>;
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
      <LogoImg src={token.img} size={"xs"} />
      {NumberUtil.formatTokenAmount(token.amount)}
    </div>
  );
};

const TxnValue = ({ color, amount }: { color: string; amount: number }) => {
  return <div className={clsx(color)}>{NumberUtil.formatPrice(amount)}</div>;
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
      <ArrowTopRightOnSquareIcon className="h-4 w-4 text-slate-100" />
      {StringUtil.shortenAddress(walletAddress, 4, 2)}
    </a>
  );
};

const TxnExplorerLink = ({
  color,
  walletAddress,
  requestkey,
}: {
  color: string;
  walletAddress: string;
  requestkey: string;
}) => {
  const unmarshalLink = (
    <a
      href={`https://xscan.io/transactions/${requestkey}?chain=kadena`}
      target="_blank"
      className={clsx(color, "flex items-center gap-1")}
      rel="noreferrer"
    >
      <UnmarshalLogo className="h-5 w-5" />
    </a>
  );

  const kadenaExplorerLink = (
    <a
      href={`https://explorer.chainweb.com/mainnet/tx/${requestkey}`}
      target="_blank"
      className={clsx(color, "flex items-center gap-1")}
      rel="noreferrer"
    >
      <LogoImg src={KadenaExplorerLogo} size={"xs"} />
    </a>
  );

  return (
    <div className="flex cursor-pointer items-center gap-2">
      {kadenaExplorerLink}
      {walletAddress.startsWith("k:") && unmarshalLink}
    </div>
  );
};

export const getTransactionHeaders = (transactions: TransactionInfo[]) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const sampleTxn = transactions[0];

  const ticker1 = sampleTxn.token0.ticker;
  const ticker2 = sampleTxn.token1.ticker;

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
  transactions: TransactionInfo[]
): DataTableRows => {
  const rows: DataTableRows = [];

  transactions.forEach((transaction) => {
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
      eventId,
    } = transaction;

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
    cells.push(
      <TxnExplorerLink
        color={color}
        walletAddress={address}
        requestkey={requestkey}
      />
    );

    rows.push({
      cells,
      rowKey: `${requestkey}-${eventId}`,
    });
  });

  return rows;
};
