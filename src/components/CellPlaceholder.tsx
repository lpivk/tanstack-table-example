import { Placeholder } from 'react-bootstrap';

export const CellPlaceholder: React.FC = () => (
  <th>
    <Placeholder as="div" animation="glow" size="lg">
      <Placeholder xs={12} bg="primary" />
    </Placeholder>
  </th>
);
