import { SortDirection } from "../../enums";
import { sortArray } from "../../utils/Array.util";
import { ColumnDef } from "./DataTable.type";

export function sortSourceData<T>(
  dataSource: T[],
  columnDefs: ColumnDef<T>[],
  sortedColumn: string,
  sortDirection: SortDirection
) {
  if (!dataSource?.length) {
    return dataSource;
  }

  const columnDefinition: ColumnDef<T> | undefined = columnDefs.find(
    (column) => column.columnKey === sortedColumn
  );

  if (!columnDefinition || !columnDefinition.getCompareValue) {
    return dataSource;
  }

  const dataSourceWithComparisonValue = dataSource.map((data) => {
    return {
      ...data,
      compareValue: columnDefinition.getCompareValue(data),
    };
  });

  return sortArray(
    dataSourceWithComparisonValue,
    "compareValue",
    sortDirection
  );
}

export function getNewSortDirection(
  currentDirection: SortDirection
): SortDirection {
  switch (currentDirection) {
    case SortDirection.Desc:
      return SortDirection.Asc;

    case SortDirection.Asc:
      return SortDirection.Desc;
  }
}
