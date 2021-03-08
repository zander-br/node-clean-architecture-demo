import Employee from '@/entities/employee/employee';

export interface EmployeeRepository {
  findByName: (name: string) => Promise<Employee>;
}
