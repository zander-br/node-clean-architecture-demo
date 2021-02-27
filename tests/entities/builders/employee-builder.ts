import { EmployeeData } from '../../../src/entities/employee/employee-data';

export default class EmployeeBuilder {
  private employee: EmployeeData = {
    name: 'Anderson Santos',
    contract: 'São Luis',
  };

  public static aEmployee(): EmployeeBuilder {
    return new EmployeeBuilder();
  }

  public withInvalidName(): EmployeeBuilder {
    this.employee.name = '';
    return this;
  }

  public withInvalidContract(): EmployeeBuilder {
    this.employee.contract = '';
    return this;
  }

  public withMedicalLeave(): EmployeeBuilder {
    this.employee.medicalLeave = true;
    return this;
  }

  public build(): EmployeeData {
    return this.employee;
  }
}
