import round from "lodash/round";
import numeral from "numeral";
import { ReactNode } from "react";

import { Tooltip } from "../components";

export const roundToDecimalStr = (num: number, decimalDigits: number) => {
  const minValue = Number(Math.pow(10, -decimalDigits).toPrecision(1));

  let optionalDigits = "";

  for (let i = 0; i < decimalDigits - 2; i++) {
    optionalDigits += "0";
  }

  const format = `0,0.00[${optionalDigits}]`;

  if (num < minValue) {
    return numeral(num).format(`0.00e+0`);
  }

  return numeral(round(num, decimalDigits)).format(format);
};

export const formatFiatValue = (num: number, decimals = 2) => {
  return `$${roundToDecimalStr(num, decimals)}`;
};

export const formatPercentage = (num: number) => {
  return numeral(num).format(`0.00%`);
};

export const formatNumber = (
  num: number,
  prepend = "",
  subscriptSize?: number
): ReactNode => {
  if (num < 0.00001) {
    const roundedNum = num.toFixed(20);

    const firstHalf = "0.0";
    let numZeros = 0;
    let secondHalf = "";

    for (let i = 2; i < roundedNum.length; i++) {
      if (roundedNum.charAt(i) === "0") {
        numZeros += 1;
      } else {
        secondHalf += roundedNum.charAt(i);
      }
      if (secondHalf.length === 4) {
        break;
      }
    }

    return (
      <span>
        <Tooltip
          content={`$0.${Array(numZeros).fill(0).join("")}${secondHalf}`}
        >
          <>
            {prepend}
            {firstHalf}
            <sub
              className="relative -bottom-[6px]"
              style={{ fontSize: subscriptSize || "8px" }}
            >
              {numZeros}
            </sub>
            {secondHalf}
          </>
        </Tooltip>
      </span>
    );
  }

  if (num >= 1) {
    return (
      <span>
        {prepend}
        {numeral(num).format("0,0.00")}
      </span>
    );
  }

  if (num < 1) {
    return (
      <span>
        {prepend}
        {num.toPrecision(4)}
      </span>
    );
  }
};

export const formatTokenAmount = (num: number) => {
  if (num < 0.0000001) {
    return numeral(num).format(`0.00e+0`);
  }

  return numeral(num).format(`0,0.00[000000]`);
};
