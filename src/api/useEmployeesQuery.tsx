import { useQuery } from '@tanstack/react-query';

import { api } from './api';

export const useEmployeesQuery = () => {
  const { data, isLoading } = useQuery(['employees'], api.getEmployees);

  return { employees: data, areEmployeesLoading: isLoading };
};
