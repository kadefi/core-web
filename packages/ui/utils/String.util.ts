export const shortenAddress = (
  walletAddress: string,
  frontCount: number = 4,
  backCount: number = 4
) => {
  const TOTAL = frontCount + backCount + 2;

  if (walletAddress.length <= TOTAL) {
    return walletAddress;
  }

  if (frontCount > 0 && backCount === 0) {
    return `${walletAddress.slice(0, 2 + frontCount)}`;
  }

  return `${walletAddress.slice(0, 2 + frontCount)}...${walletAddress.slice(
    -backCount
  )}`;
};
