import Employee from '@/entities/employee/employee';
import EmployeeDataBuilder from '@/tests/entities/builders/employee-builder';
import { EmployeeRepository } from '@/usecases/ports/employee-repository';

export default class InMemoryEmployeeRepository implements EmployeeRepository {
  private readonly employees: Employee[] = [];

  constructor() {
    const employee = EmployeeDataBuilder.aEmployee().buildClass();
    this.employees.push(employee);
  }

  async findByName(name: string): Promise<Employee> {
    return this.employees.find(employee => employee.name.value === name);
  }
}
