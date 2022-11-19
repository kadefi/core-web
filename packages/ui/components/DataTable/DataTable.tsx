import clsx from "clsx";

import { DataTableRows } from "./DataTable.type";

type Props = {
  headers: string[];
  rows: DataTableRows;
  size?: "sm" | "lg";
  rounded?: boolean;
};

const DataTable = (props: Props) => {
  const { headers, rows, size = "sm", rounded = false } = props;

  const padding = size === "sm" ? "px-2 py-3" : "px-3 py-4";

  return (
    <div className="flex flex-col">
      <div className="scrollbar-hide overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className={clsx("overflow-hidden", rounded && "md:rounded-lg")}>
            <table className="min-w-full">
              <thead className="bg-slate-800 text-slate-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={`header-${index}`}
                      scope="col"
                      className={clsx(
                        "text-left text-sm font-semibold",
                        padding,
                        index === 0 &&
                          clsx("sm:pl-6", rounded && "rounded-l-lg"),
                        index === headers.length - 1 &&
                          clsx("sm:pr-6", rounded && "rounded-r-lg")
                      )}
                    >
                      <div className="group inline-flex">
                        <span className="whitespace-nowrap">{header}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-50">
                {rows.map((row, i) => {
                  const { cells } = row;

                  return (
                    <tr
                      key={`row-${i}`}
                      className={clsx(
                        "transition hover:bg-slate-800/20",
                        row.onRowClick && "cursor-pointer"
                      )}
                      onClick={() => row.onRowClick && row.onRowClick()}
                    >
                      {cells.map((cell, j) => {
                        return (
                          <td
                            key={`row-cell-${i}-${j}`}
                            className={clsx(
                              "whitespace-nowrap text-sm ",
                              padding,
                              j === 0 && "pl-4 pr-3 sm:pl-6",
                              j === cells.length - 1 && "pl-3 pr-4 sm:pr-6"
                            )}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
