import { ReactNode } from "react";

export type DataTableRows = {
  cells: ReactNode[];
  rowKey?: string;
  onRowClick?: () => void;
}[];
