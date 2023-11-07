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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Table = ({ data, header }) => {
    const columns = useMemo(() => header, []);

  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageIndex,
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
      <input
        type="text"
        className="float-end form-control w-25"
        placeholder="Search..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <table {...getTableProps()} className="table">
        <thead>
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
                    ) : ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
          })}
        </tbody>
      </table>
      <div className="col-6 d-flex justify-content-evenly align-items-baseline">
        <i
          className="btn"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <IoIosArrowBack />
          <IoIosArrowBack />
        </i>{" "}
        <i
          className="btn"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <IoIosArrowBack />
        </i>{" "}
        <i className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
          <IoIosArrowForward />
        </i>{" "}
        <i
          className="btn"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <IoIosArrowForward />
          <IoIosArrowForward />
        </i>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
      </div>
    </div>
  );
};

export default Table;
