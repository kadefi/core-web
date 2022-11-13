import dynamic from "next/dynamic";

import { getPageLayout } from "../Layout";

const TVChartContainer = dynamic(
  // @ts-ignore
  () =>
    import("../../components/TVChartContainer").then(
      (mod) => mod.TVChartContainer
    ),
  { ssr: false }
);

const Pair = () => {
  return (
    <>
      <TVChartContainer />
    </>
  );
};

Pair.getLayout = getPageLayout;

export default Pair;
