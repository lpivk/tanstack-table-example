import _ from 'lodash';
import { flexRender } from '@tanstack/react-table';
import { Container, Table } from 'react-bootstrap';

import { CellPlaceholder, ColumnHeader, Pagination } from '../components';

import { useEmployeesQuery } from '../api';
import { useEmployeesTable } from '../hooks';

export const Employees = () => {
  const { employees, areEmployeesLoading } = useEmployeesQuery();

  const table = useEmployeesTable(employees);

  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '4rem' }}>Employees Table</h1>
      <Table
        hover
        style={{
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.075)',
        }}
      >
        <thead>
          <tr style={{ height: '50px' }}>
            {(() => {
              const { headers } = table.getHeaderGroups()[0];

              return _.map(headers, (header, i) =>
                i === 0 ? (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      verticalAlign: 'middle',
                      fontSize: '18px',
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ) : (
                  <ColumnHeader header={header} />
                )
              );
            })()}
          </tr>
        </thead>
        {areEmployeesLoading ? (
          <TableBodyLoading />
        ) : (
          <tbody>
            {_.map(table.getRowModel().rows, (row) => {
              const cells = row.getVisibleCells();

              return (
                <tr
                  key={row.id}
                  style={
                    row.getIsSelected()
                      ? {
                          backgroundColor: '#cbedff',
                          borderBottom: '1px solid #0d6efd',
                          verticalAlign: 'middle',
                        }
                      : { verticalAlign: 'middle' }
                  }
                >
                  <td>
                    {flexRender(cells[0].column.columnDef.cell, cells[0].getContext())}
                  </td>
                  <td>{cells[1]?.getValue() as string}</td>
                  <td>{cells[2]?.getValue() as string}</td>
                  <td>{cells[3]?.getValue() as string}</td>
                  <td>${(cells[4]?.getValue() as number)?.toLocaleString('en-US')}</td>
                  <td>{cells[5]?.getValue() as string}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
      <Pagination table={table} data={employees ?? []} />
    </Container>
  );
};

const TableBodyLoading = () => (
  <tbody>
    {(() => {
      return [...Array(10)].map((_, i) => (
        <tr key={i}>
          <th />
          <CellPlaceholder />
          <CellPlaceholder />
          <CellPlaceholder />
          <CellPlaceholder />
          <CellPlaceholder />
        </tr>
      ));
    })()}
  </tbody>
);
