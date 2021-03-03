import Employee from '../../../src/entities/employee/employee';
import { EmployeeData } from '../../../src/entities/employee/employee-data';
import BenefitBuilder from './benefit-builder';

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

  public buildClass(): Employee {
    const employeeClass = Employee.create(this.employee).value as Employee;
    return employeeClass;
  }

  public buildClassWithOneBenefit(): Employee {
    const employeeClass = Employee.create(this.employee).value as Employee;
    const benefit = BenefitBuilder.aBenefit().buildClass();
    employeeClass.addBenefit(benefit);
    return employeeClass;
  }

  public buildClassWithUniqueBenefit(): Employee {
    const employeeClass = Employee.create(this.employee).value as Employee;
    const uniqueBenefit = BenefitBuilder.aBenefit()
      .withMonthlyFrequency()
      .buildClass();
    employeeClass.addBenefit(uniqueBenefit);
    return employeeClass;
  }
}
