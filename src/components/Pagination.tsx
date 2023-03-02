import { Table } from '@tanstack/react-table';
import { Pagination as RBPagination } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface PaginationProps {
  data: any[];
  table: Table<any>;
}

export const Pagination: React.FC<PaginationProps> = ({ data, table }) => {
  let isOutOfRange: boolean | undefined;

  const pageNumbers = [...new Array(table.getPageCount())].map((_, index) => {
    const pageNumber = index + 1;
    const currentPage = table.getState().pagination.pageIndex + 1;
    const isFirst = pageNumber == 1;
    const isLast = pageNumber == table.getPageCount();
    const isWithinTwoNumbers = Math.abs(pageNumber - currentPage) <= 2;

    //in case of only one page, reset pagination to first page after data is collapsed
    if (currentPage > table.getPageCount()) table.resetPageIndex();

    if (isFirst || isLast || isWithinTwoNumbers) {
      isOutOfRange = false;

      return (
        <RBPagination.Item
          key={pageNumber}
          active={pageNumber == currentPage}
          onClick={() => table.setPageIndex(pageNumber - 1)}
        >
          {pageNumber}
        </RBPagination.Item>
      );
    }

    if (!isOutOfRange) {
      isOutOfRange = true;
      return <RBPagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
      <div style={{ marginRight: '2rem' }}>Total {data.length} items</div>
      <RBPagination style={{ margin: 0 }}>
        <RBPagination.Prev
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft style={{ height: '12px', width: '12px' }} />
        </RBPagination.Prev>
        {pageNumbers}
        <RBPagination.Next
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight style={{ height: '12px', width: '12px' }} />
        </RBPagination.Next>
      </RBPagination>
    </div>
  );
};
