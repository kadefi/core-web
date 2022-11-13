import round from "lodash/round";
import numeral from "numeral";

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

export const formatFiatValue = (num: number, decimals: number = 2) => {
  return `$${roundToDecimalStr(num, decimals)}`;
};

export const formatPercentage = (num: number) => {
  return numeral(num).format(`0.00%`);
};

export const formatPrice = (num: number) => {
  if (num < 0.0000001) {
    return numeral(num).format(`0.00e+0`);
  }

  return numeral(num.toPrecision(2)).format(`0,0.00[0000]`);
};
