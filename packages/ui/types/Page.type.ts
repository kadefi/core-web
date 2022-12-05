import { DehydratedState } from "@tanstack/react-query";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & LayoutFn;

export type LayoutFn<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

export type DehydratedStateProps = {
  dehydratedState: DehydratedState;
};
