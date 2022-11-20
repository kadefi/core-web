import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { DataTableRows } from "./DataTable.type";

type Props = {
  headers: string[];
  rows: DataTableRows;
  size?: "sm" | "lg";
  rounded?: boolean;
};

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;

  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const DataTable = (props: Props) => {
  const { headers, rows, size = "sm", rounded = false } = props;

  const padding = size === "sm" ? "px-2 py-3" : "px-3 py-4";

  return (
    <div className="flex flex-col">
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
                {rows.map((row) => {
                  const { cells, rowKey, onRowClick } = row;

                  return (
                    <tr
                      key={`row-${rowKey}`}
                      className={clsx(
                        "transition hover:bg-slate-800/20",
                        onRowClick && "cursor-pointer"
                      )}
                      onClick={() => onRowClick && onRowClick()}
                    >
                      {cells.map((cell, j) => {
                        return (
                          <td
                            key={`row-cell-${j}-${rowKey}`}
                            className={clsx(
                              "whitespace-nowrap text-sm ",
                              padding,
                              j === 0 && "pl-4 pr-3 sm:pl-6",
                              j === cells.length - 1 && "pl-3 pr-4 sm:pr-6"
                            )}
                          >
                            <Transition.Child
                              enter="transition ease duration-500 transform"
                              enterFrom="opacity-0 translate-y-6"
                              enterTo="opacity-100 translate-y-0"
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
