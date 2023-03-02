import { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowReturnRight, DashSquare, PlusSquare } from 'react-bootstrap-icons';

import { Checkbox } from 'src/components';
import { Employee } from 'src/types';

export const useColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Employee>[] => [
      {
        id: 'expand-select',
        accessorFn: () => 'expand-select',
        header: ({ table }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '38px',
            }}
          >
            <Checkbox
              {...{
                checked: table.getIsAllRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
              style={{ width: '16px', height: '16px' }}
            />
            {table.getIsAllRowsExpanded() ? (
              <DashSquare
                onClick={table.getToggleAllRowsExpandedHandler()}
                style={{ width: '16px', height: '16px' }}
              />
            ) : (
              <PlusSquare
                onClick={table.getToggleAllRowsExpandedHandler()}
                style={{ width: '16px', height: '16px' }}
              />
            )}
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '38px',
              }}
            >
              {row.depth > 0 && <ArrowReturnRight />}
              <Checkbox
                {...{
                  checked: row.getIsSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
                style={{ width: '16px', height: '16px' }}
              />
              {row.originalSubRows &&
                (row.getIsExpanded() ? (
                  <DashSquare onClick={row.getToggleExpandedHandler()} />
                ) : (
                  <PlusSquare onClick={row.getToggleExpandedHandler()} />
                ))}
            </div>
          );
        },
      },
      {
        id: 'firstName',
        accessorFn: (row) => row.firstName,
        cell: (info) => info.getValue(),
        header: () => 'First Name',
      },
      {
        id: 'lastName',
        accessorFn: (row) => row.lastName,
        cell: (info) => info.getValue(),
        header: () => 'Last Name',
      },
      {
        id: 'dateOfBirth',
        accessorFn: (row) => row.dateOfBirth,
        cell: (info) => info.getValue(),
        header: () => 'Date of Birth',
      },
      {
        id: 'salary',
        accessorFn: (row) => row.salary,
        cell: (info) => info.getValue(),
        header: () => 'Salary',
        filterFn: (row, _, value) => {
          if (!row.original.salary.toString().includes(value)) return false;
          return true;
        },
      },
      {
        id: 'department',
        accessorFn: (row) => row.department,
        cell: (info) => info.getValue(),
        header: () => 'Department',
      },
    ],
    []
  );
  return columns;
};
