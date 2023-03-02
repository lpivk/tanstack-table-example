import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};
