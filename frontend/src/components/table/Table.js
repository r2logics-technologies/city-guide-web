import React, { useMemo } from "react";
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

const Table = ({ data, header }) => {
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

  return (
    <div>
      <div className="d-flex  justify-content-between align-items-center">
        <div className="col-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="col-5 d-flex gap-3 align-items-center">
          <b
            className="btn btn-outline-dark border-0 rounded-pill"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </b>
          <b
            className="btn btn-outline-dark border-0 rounded-pill"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </b>
          <b className="btn btn-outline-dark border-0 rounded-pill" onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </b>
          <b
            className="btn btn-outline-dark border-0 rounded-pill"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </b>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>
          </span>
        </div>
      </div>
      <div class="table-responsive my-2">
        <table {...getTableProps()} className="table" height={150}>
          <thead class="table-light">
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
          <tbody {...getTableBodyProps()} class="table-group-divider">
            {page.length > 0 ?( page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })) : (<div className="text-center">No Data.</div>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
