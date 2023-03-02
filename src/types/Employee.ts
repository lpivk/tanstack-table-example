export type Employee = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  salary: number;
  department: string;

  subordinates?: Employee[];
};
