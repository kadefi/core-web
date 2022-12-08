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

export const formatPrice = (num: number, subscriptSize?: number): ReactNode => {
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
      <Tooltip content={`$0.${Array(numZeros).fill(0).join("")}${secondHalf}`}>
        <span>
          ${firstHalf}
          <sub
            className="relative -bottom-[6px]"
            style={{ fontSize: subscriptSize || "8px" }}
          >
            {numZeros}
          </sub>
          {secondHalf}
        </span>
      </Tooltip>
    );
  }

  let precision = 2;

  if (num < 1) {
    precision = 4;
  }

  return `$${numeral(num.toPrecision(precision)).format("0,0.00[0000000]")}`;
};

export const formatTokenAmount = (num: number) => {
  if (num < 0.0000001) {
    return numeral(num).format(`0.00e+0`);
  }

  return numeral(num.toPrecision(2)).format(`0,0.[000000]`);
};
