import { EmployeeData } from '../../../src/entities/employee/employee-data';

export default class EmployeeDataBuilder {
  private employee: EmployeeData = {
    name: 'Anderson Santos',
    contract: 'São Luis',
  };

  public static aEmployee(): EmployeeDataBuilder {
    return new EmployeeDataBuilder();
  }

  public withInvalidName(): EmployeeDataBuilder {
    this.employee.name = '';
    return this;
  }

  public withInvalidContract(): EmployeeDataBuilder {
    this.employee.contract = '';
    return this;
  }

  public withMedicalLeave(): EmployeeDataBuilder {
    this.employee.medicalLeave = true;
    return this;
  }

  public withoutTransportationVoucherDiscount(): EmployeeDataBuilder {
    this.employee.transportationVoucherDiscount = false;
    return this;
  }

  public withoutMealVoucherDiscount(): EmployeeDataBuilder {
    this.employee.mealVoucherDiscount = false;
    return this;
  }

  public build(): EmployeeData {
    return this.employee;
  }
}
