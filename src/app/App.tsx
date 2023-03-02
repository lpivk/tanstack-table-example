import { ReactQueryProvider } from './utils';

import { Employees } from 'src/screens';

export const App = () => {
  return (
    <ReactQueryProvider>
      <div
        style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <Employees />
      </div>
    </ReactQueryProvider>
  );
};
