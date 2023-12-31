import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import {
  TbSortDescendingLetters,
  TbSortAscendingLetters,
} from "react-icons/tb";
import NoData from "components/noData/NoData";
import TableLoader from "components/spinner/TableLoader";

const Table = ({ data, header }) => {
  const [loading, setLoading] = useState(true);

  const columns = useMemo(() => header, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter, pageIndex },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [data]);

  return (
    <div>
      <div className="d-flex row justify-content-between align-items-center">
        <div className="col d-flex gap-3 align-items-center">
          <div className={pageCount < 2 ? "d-none" : ""}>
            <b
              className={`btn-page px-3 py-1 mx-1 ${
                canPreviousPage  ? 'shadow' : "disabled"
              }`}
              onClick={() => previousPage()}
              title="previous"
            >
              {"<"}
            </b>
            <b
              className={`btn-page px-3 py-1 mx-1 ${
                canNextPage ? 'shadow' : "disabled"
              }`}
              onClick={() => nextPage()}
              title="next"
            >
              {">"}
            </b>
            <span className="ms-4">
              Page - {" "}
              <strong>
                {pageIndex + 1} of {pageCount}
              </strong>
            </span>
          </div>
        </div>
        <div className="col-3">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive my-2">
        <table
          {...getTableProps()}
          className="table table-hover table-sm"
          height={150}
        >
          <thead className="bg-theme">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TbSortDescendingLetters />
                        ) : (
                          <TbSortAscendingLetters />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-group-divider">
            {!loading ? (
              page.length > 0 ? (
                page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={headerGroups[0].headers.length}>
                    <NoData />
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={headerGroups[0].headers.length}>
                  <TableLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
