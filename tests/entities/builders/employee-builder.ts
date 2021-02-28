import Employee from '../../../src/entities/employee/employee';
import EmployeeDataBuilder from './employee-data-builder';

export default class EmployeeBuilder {
  private employeeData = EmployeeDataBuilder.aEmployee().build();

  private employee = Employee.create(this.employeeData).value as Employee;

  public static aEmployee(): EmployeeBuilder {
    return new EmployeeBuilder();
  }

  public build(): Employee {
    return this.employee;
  }
}
