import React from 'react'
import { useFilters, useTable } from 'react-table'

const DisplayTable = ({ columns, data }) => {
  const [filterInput, setFilterInput] = React.useState('')
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable({
    columns,
    data
  }, useFilters,
  );

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
                <th {...column.getHeaderProps()}
                style={{
                  padding: '10px',
                  // border: 'solid 1px grey',
                  background: 'aliceblue',
                  'display': 'table-cell'
                }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}
        style={{
          'display': 'table-row-group'
        }}>
          {rows.map(row => {
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
    </div>
  )
}

export default DisplayTable