import clsx from "clsx";

import { DataTableRows } from "./DataTable.type";

type Props = {
  headers: string[];
  rows: DataTableRows;
};

const DataTable = (props: Props) => {
  const { headers, rows } = props;

  return (
    <div className="mt-6 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden md:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-slate-800 text-slate-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={`header-${index}`}
                      scope="col"
                      className={clsx(
                        "px-3 py-4 text-left text-sm font-semibold",
                        index === 0 && "rounded-l-lg sm:pl-6",
                        index === headers.length - 1 && "rounded-r-lg sm:pr-6"
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
                      className="cursor-pointer cursor-pointer transition hover:bg-slate-800/20"
                      onClick={() => row.onRowClick && row.onRowClick()}
                    >
                      {cells.map((cell, j) => {
                        return (
                          <td
                            key={`row-cell-${i}-${j}`}
                            className={clsx(
                              "whitespace-nowrap py-4 px-3 text-sm ",
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
