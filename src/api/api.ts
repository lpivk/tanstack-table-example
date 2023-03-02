import { faker } from '@faker-js/faker';

import { Employee } from 'src/types';

export const getEmployees = async (): Promise<Employee[]> => {
  let employees: Employee[] = [];

  for (let i = 1; i <= 100; i++) {
    const department = faker.commerce.department();

    let subordinates: Employee[] = [];

    for (let i = 1; i <= 3; i++) {
      subordinates.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(30).toLocaleString().slice(0, 10),
        salary: parseFloat(faker.random.numeric(5)),
        department,
      });
    }

    employees.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.date.past(99).toLocaleString().slice(0, 10),
      salary: parseFloat(faker.random.numeric(6)),
      department,

      subordinates,
    });
  }

  return new Promise((resolve) => setTimeout(resolve, 2000, employees));
};

export const api = {
  getEmployees,
};
