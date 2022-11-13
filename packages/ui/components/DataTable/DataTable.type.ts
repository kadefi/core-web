import { ReactNode } from "react";

export type DataTableRows = {
  cells: ReactNode[];
  onRowClick?: () => void;
}[];
