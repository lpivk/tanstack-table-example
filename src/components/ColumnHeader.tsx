import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search, ChevronUp, ChevronDown, ChevronExpand } from 'react-bootstrap-icons';
import { Header, flexRender } from '@tanstack/react-table';

interface ColumnHeaderProps {
  header: Header<any, any>;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ header }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (
      header.column.getFilterValue() != '' &&
      header.column.getFilterValue() != undefined
    )
      setFilterOpen(true);
  }, []);

  return (
    <th style={{ verticalAlign: 'middle' }}>
      {filterOpen ? (
        <span style={{}}>
          <InputGroup>
            <Form.Control
              placeholder="Search"
              value={header.column.getFilterValue() as string}
              onChange={(e) => header.column.setFilterValue(e.target.value)}
              style={{
                height: '32px',
                fontSize: '0.8rem',
                maxWidth: '120px',
                minWidth: '100px',
              }}
            />
            <Button
              style={{
                height: '32px',
                width: '32px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#ced4da',
              }}
              onClick={() => {
                header.column.setFilterValue('');
                setFilterOpen(false);
              }}
              variant="light"
            >
              X
            </Button>
          </InputGroup>
        </span>
      ) : (
        <span>
          <span
            {...{
              onClick: header.column.getToggleSortingHandler(),
            }}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            <span style={{ marginLeft: '0.6rem' }}>
              {{
                false: <ChevronExpand />,
                asc: <ChevronUp />,
                desc: <ChevronDown />,
              }[header.column.getIsSorted() as string] ?? null}
            </span>
          </span>
          <span style={{ marginLeft: '0.6rem' }}>
            {header.column.getCanFilter() && (
              <Search onClick={() => setFilterOpen(true)} />
            )}
          </span>
        </span>
      )}
    </th>
  );
};
