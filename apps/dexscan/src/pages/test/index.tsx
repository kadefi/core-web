import { Alert } from "flowbite-react";

import { getPageLayout } from "../../layouts/Layout";

const Test = () => {
  return <Alert color="info">Alert!</Alert>;
};

Test.getLayout = getPageLayout;

export default Test;
