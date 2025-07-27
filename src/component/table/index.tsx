import React from "react";
import noRecords from "../../assets/images/norecordfound.png";
import { NoRecordsWrapper, TableWrapper } from "../component-styles";
import { Loader } from "../loader";

type ScopedSlotFunction<T> = (params: {
  row: T;
  key: string;
  index: number;
}) => React.ReactNode;

type TableProps<T> = {
  columns: string[];
  data: T[];
  Clickable?: boolean;
  rowClick?: (row: T) => void;
  columnClassNames?: string[];
  columnColSpans?: number[];
  tableRef?: React.RefObject<HTMLTableElement>;
  loader?: boolean;
  scopedSlots?: {
    [key: string]: ScopedSlotFunction<T>;
  };
};

function TableData<T extends Record<string, any>>(props: TableProps<T>) {
  const {
    columns,
    data,
    Clickable,
    rowClick,
    columnClassNames,
    columnColSpans,
    tableRef,
    loader,
    scopedSlots = {},
  } = props;

  return (
    <TableWrapper>
      <table ref={tableRef} className="table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column}
                colSpan={columnColSpans?.[index] ?? 1}
                className={`relative px-3 ${columnClassNames?.[index] ?? ""}`}
              >
                <div className="flex">
                  <div className="inline">{column}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ cursor: Clickable ? "pointer" : "default" }}>
          {loader ? (
            <td colSpan={columns.length}>
              <div className="flex items-center justify-center  mt-20">
                <Loader />
              </div>
            </td>
          ) : data?.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                onClick={
                  Clickable
                    ? (e) => {
                        e.stopPropagation();
                        rowClick?.(row);
                      }
                    : undefined
                }
              >
                {columns.map((column) => (
                  <td key={column}>
                    {scopedSlots[column]
                      ? scopedSlots[column]!({ row, key: column, index })
                      : row[column.toLowerCase()] ?? "NA"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <td colSpan={columns.length}>
              <NoRecordsWrapper>
                <div className="No_Records_Ctrl"></div>
                <div className="flex items-center justify-center mt-14">
                  <img
                    src={noRecords}
                    alt="No Records"
                    width={200}
                    height={200}
                  />
                </div>
                <h4>
                  <b>No records Found</b>
                </h4>
              </NoRecordsWrapper>
            </td>
          )}
        </tbody>
      </table>
    </TableWrapper>
  );
}

export default TableData;
