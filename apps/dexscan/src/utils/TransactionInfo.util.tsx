import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { format } from "date-fns/fp";
import { LogoImg, NumberUtil, StringUtil } from "ui";

import { trackEvent } from "../analytics/Analytics.util";
import KadenaExplorerLogo from "../assets/pngs/logos/kadena-block-explorer.png";
import UnmarshalLogo from "../assets/svgs/logos/unmarshal.svg";
import { AmplitudeEvent } from "../enums";
import {
  TransactionInfo,
  TransactionTokenInfo,
} from "../types/TransactionsTable.type";

const getColor = (dataItem: TransactionInfo) => {
  return dataItem.type === "BUY" ? "text-green-200" : "text-red-300";
};

export const renderDate = (dataItem: TransactionInfo) => {
  return (
    <div className={getColor(dataItem)}>
      {format("yyyy-MM-dd HH:mm:ss", new Date(dataItem.timestamp))}
    </div>
  );
};

export const renderType = (dataItem: TransactionInfo) => {
  const typeColor = dataItem.type === "BUY" ? "text-green-500" : "text-red-500";

  return <div className={clsx(typeColor, "font-medium")}>{dataItem.type}</div>;
};

export const renderPrice = (dataItem: TransactionInfo) => {
  return (
    <div className={clsx(getColor(dataItem), "whitespace-nowrap")}>
      {NumberUtil.formatNumber(dataItem.price, "$")}
    </div>
  );
};

const renderToken = (token: TransactionTokenInfo, color: string) => {
  return (
    <div className={clsx("flex items-center gap-2", color)}>
      <LogoImg src={token.img} size={"xs"} />
      {NumberUtil.formatNumber(token.amount)}
    </div>
  );
};

export const renderToken0 = (dataItem: TransactionInfo) => {
  return (
    <div className={clsx("flex items-center gap-2", getColor(dataItem))}>
      {renderToken(dataItem.token0, getColor(dataItem))}
    </div>
  );
};

export const renderToken1 = (dataItem: TransactionInfo) => {
  return (
    <div className={clsx("flex items-center gap-2", getColor(dataItem))}>
      {renderToken(dataItem.token1, getColor(dataItem))}
    </div>
  );
};

export const renderValue = (dataItem: TransactionInfo) => {
  return (
    <div className={clsx(getColor(dataItem))}>
      {NumberUtil.formatNumber(dataItem.amount, "$")}
    </div>
  );
};

export const renderWalletLink = (dataItem: TransactionInfo) => {
  const kadefiUrl = `https://kadefi.money/dashboard/${dataItem.address}`;
  const trackWalletAddressClick = () => {
    trackEvent(AmplitudeEvent.TransactionAddressNavigate, {
      address: dataItem.address,
      url: kadefiUrl,
    });
  };

  const walletDisplay = (
    <div className={getColor(dataItem)}>
      {StringUtil.shortenAddress(dataItem.address, 4, 2)}
    </div>
  );

  if (dataItem.address.startsWith("k:")) {
    return (
      <a
        href={kadefiUrl}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          getColor(dataItem),
          "flex w-full items-center justify-between gap-1"
        )}
        onClick={trackWalletAddressClick}
      >
        {walletDisplay}
        <ArrowTopRightOnSquareIcon className="h-4 w-4 text-sky-400" />
      </a>
    );
  } else {
    return walletDisplay;
  }
};

export const renderExplorerLink = (dataItem: TransactionInfo) => {
  const unmarshalUrl = `https://xscan.io/transactions/${dataItem.requestkey}?chain=kadena`;
  const kadenaExplorerUrl = `https://explorer.chainweb.com/mainnet/tx/${dataItem.requestkey}`;

  const unmarshalLink = (
    <a
      href={unmarshalUrl}
      target="_blank"
      className={clsx(getColor(dataItem), "flex items-center gap-1")}
      rel="noreferrer"
      onClick={() =>
        trackEvent(AmplitudeEvent.UnmarshalNavigate, { url: unmarshalUrl })
      }
    >
      <UnmarshalLogo className="h-5 w-5" />
    </a>
  );

  const kadenaExplorerLink = (
    <a
      href={kadenaExplorerUrl}
      target="_blank"
      className={clsx(getColor(dataItem), "flex items-center gap-1")}
      rel="noreferrer"
      onClick={() =>
        trackEvent(AmplitudeEvent.KadenaExplorerNavigate, {
          url: kadenaExplorerUrl,
        })
      }
    >
      <LogoImg src={KadenaExplorerLogo} size={"xs"} />
    </a>
  );

  return (
    <div className="flex cursor-pointer items-center gap-2">
      {kadenaExplorerLink}
      {dataItem.address.startsWith("k:") && unmarshalLink}
    </div>
  );
};

export const renderToken0ColumnName = (dataSource: TransactionInfo[]) => {
  if (!dataSource || dataSource.length === 0) {
    return null;
  }

  const sampleTxn = dataSource[0];

  return sampleTxn.token0.ticker;
};

export const renderToken1ColumnName = (dataSource: TransactionInfo[]) => {
  if (!dataSource || dataSource.length === 0) {
    return null;
  }

  const sampleTxn = dataSource[0];

  return sampleTxn.token1.ticker;
};

export const getRowKey = (dataItem: TransactionInfo) => {
  return `${dataItem.requestkey}-${dataItem.eventId}`;
};
