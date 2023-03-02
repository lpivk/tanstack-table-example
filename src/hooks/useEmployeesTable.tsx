import { useState, useMemo } from 'react';
import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Employee } from 'src/types';
import { useColumns } from './useColumns';

export const useEmployeesTable = (employees?: Employee[]) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useColumns();

  const table = useReactTable<Employee>({
    // essential options
    columns,
    data: employees ?? [],
    getCoreRowModel: getCoreRowModel(),

    // expand/collapse row(s)
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subordinates,

    // sort
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    sortDescFirst: false,

    // filter
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,

    // select row(s)
    onRowSelectionChange: setRowSelection,
    enableSubRowSelection: false,

    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,

    state: { expanded, sorting, rowSelection, pagination },
  });

  return useMemo(() => table, [employees]);
};
