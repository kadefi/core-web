import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { DataTableRows } from "./DataTable.type";

type Props = {
  headers: string[];
  rows: DataTableRows;
  size?: "sm" | "lg";
  rounded?: boolean;
  tableBottomRef?: (_node?: Element | null) => void | null;
};

const DataTable = (props: Props) => {
  const {
    headers,
    rows,
    size = "sm",
    rounded = false,
    tableBottomRef = null,
  } = props;

  const padding = size === "sm" ? "px-1 py-2" : "px-3 py-4";

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="shadow-sm ring-1 ring-black ring-opacity-5">
          <Transition show={true} appear={true}>
            <table className="min-w-full">
              <thead className="bg-slate-800 text-slate-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={`header-${index}`}
                      scope="col"
                      className={clsx(
                        "sticky top-0 z-10 bg-slate-800 text-left text-sm font-semibold text-slate-50 ",
                        padding,
                        index === 0 &&
                          clsx("pl-4 pr-3 sm:pl-6", rounded && "rounded-l-lg"),
                        index === headers.length - 1 &&
                          clsx("pl-3 pr-4 sm:pr-6", rounded && "rounded-r-lg")
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
                {rows.map((row, rowIndex) => {
                  const { cells, rowKey, onRowClick } = row;

                  const ref =
                    rowIndex === rows.length - 3 ? tableBottomRef : null;

                  return (
                    <tr
                      key={`row-${rowKey}`}
                      className={clsx(
                        "transition hover:bg-slate-800/20",
                        onRowClick && "cursor-pointer"
                      )}
                      onClick={() => onRowClick && onRowClick()}
                      ref={ref}
                    >
                      {cells.map((cell, j) => {
                        return (
                          <td
                            key={`row-cell-${j}-${rowKey}`}
                            className={clsx(
                              "whitespace-nowrap pr-4 text-sm",
                              padding,
                              j === 0 && "pl-4 pr-3 sm:pl-6",
                              j === cells.length - 1 && "pl-3 pr-4 sm:pr-6"
                            )}
                          >
                            <Transition.Child
                              enter="transition ease duration-500 transform"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                            >
                              {cell}
                            </Transition.Child>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
