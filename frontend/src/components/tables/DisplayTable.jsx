import React, { useEffect, useState } from 'react'
import {
  useFilters,
  useTable,
  useSortBy,
  useGroupBy,
  useExpanded,
  usePagination,
} from 'react-table'

import { useExportData } from 'react-table-plugins' // plug-in for exporting data to CSV, XLSX, PDF
import Papa from 'papaparse'  // plug-in for exporting data to CSV
import * as XLSX from 'xlsx' // plug-in for exporting data to XLSX
import JsPDF from 'jspdf' // plug-in for exporting data to PDF
import 'jspdf-autotable'  // plug-in for exporting data to PDF


const DisplayTable = ({ columns, data, updateMyData }) => {
  const [filterInput, setFilterInput] = React.useState('')
  // const [dataRows, setData] = useState(data)


  // Editable cell
  const EditableCell = ({
    value: initialValue,
    row: { values },
    column: { id },
    updateMyData,
    skipPageReset,
  }) => {
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
      setValue(e.target.value)
    }

    const onBlur = () => {
      updateMyData(values.id, id, value)
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }

  // const updateMyData = (rowIndex, columnId, value) => {
  //   // We also turn on the flag to not reset the page
  //   // skipPageResetRef.current = true
  //   setData(old => old.map((row, index) => {
  //     if (index === rowIndex) {
  //       return {
  //         ...old[rowIndex],
  //         [columnId]: value,
  //       }
  //     }
  //     return row
  //   }))
  // }

  // Default column settings
  const defaultColumn = {
    Cell: EditableCell,
  }

  // Function to handle the search box and filter the table
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };

  // Function to export data to CSV and create a file
  const getExportFile = ({ columns, data, fileType, fileName }) => {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns.map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example
      const header = columns.map((c) => c.exportValue);
      const compatibleData = data.map((row) => {
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });
      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } else if (fileType === "pdf") {
      // PDF example
      const headerNames = columns.map((column) => column.exportValue);
      const doc = new JsPDF();
      doc.autoTable({
        head: [headerNames],
        body: data,
        styles: { 
          halign: "left",
          valign: "center",
          fontSize: 12,
        },
      });
      doc.save(`${fileName}.pdf`);
    }
    // else {
    //   // Other formats goes here
    // }
    return false;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    page,
    exportData,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, groupBy, expanded, selectedRowIds },
  } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
    initialState: { pageIndex: 0 },
    getExportFile,
  }, 
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useExportData,
  );

  return (
    <div>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <table {...getTableProps()}
      className="table table-bordered table-condensed table-responsive"
      style={{
        // border: 'solid 1px blue',
        'display': 'table',
        width: '100%'
      }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}
            style={{
              background: 'grey',
              // color: 'white',
              fontWeight: 'bold',
              // 'display': 'table-row'
            }}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  padding: '10px',
                  // border: 'solid 1px grey',
                  background: 'aliceblue',
                  'display': 'table-cell'
                }}>
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '🛑 ' : '👊 '}
                    </span>
                  ) : null}
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? ' 🔽' : ' 🔼'
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}
        style={{
          'display': 'table-row-group'
        }}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}
              style={{
                'display': 'table-row'
              }}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}
                    style={{
                      padding: '2px',
                      // border: 'solid 1px grey',
                      background: 'darkgrey',
                      'display': 'table-cell'
                    }}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
          {/* PAGINATION FORM */}
      <div className="pagination">
        <form className='form-inline'>
          <div className='form-group file-export'>
            <button className='btn btn-primary' onClick={() => exportData('csv', true)}>Export CSV</button>
            <button className='btn btn-primary' onClick={() => exportData('xlsx', true)}>Export XLSX</button>
            <button className='btn btn-primary' onClick={() => exportData('pdf', true)}>Export PDF</button>
          </div>
          <div className="form-group">
            <ul className="pagination">

              <li className={`${!canPreviousPage ? 'page-item disabled' : 'page-item'}`}>
                <button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
                </button>
              </li>

              <li className={`${!canPreviousPage ? 'page-item disabled' : 'page-item'}`}>
                <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'<'}
                </button>
              </li>

              <li className={`${!canNextPage ? 'page-item disabled' : 'page-item'}`}>
                <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
                </button>
              </li>

              <li className={`${!canNextPage ? 'page-item disabled' : 'page-item'}`}>
                <button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
                </button>
              </li>

            </ul>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            | Go to page:{' '}
          </span>
        </form>
      </div>
    </div>
  )
}

export default DisplayTable