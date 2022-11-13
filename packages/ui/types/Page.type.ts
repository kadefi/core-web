import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type CustomNextPage = NextPage & Page;

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
