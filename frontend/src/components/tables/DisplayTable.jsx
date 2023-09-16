import React from 'react'
import {
  useFilters,
  useTable,
  useSortBy,
  useGroupBy,
  useExpanded,
  usePagination,
} from 'react-table'

const DisplayTable = ({ columns, data }) => {
  const [filterInput, setFilterInput] = React.useState('')
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, groupBy, expanded },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 2 },
  }, 
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
  );

  // Function to handle the search box and filter the table
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };

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