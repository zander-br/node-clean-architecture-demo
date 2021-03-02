import Employee from '../../../src/entities/employee/employee';
import BenefitBuilder from './benefit-builder';
import EmployeeDataBuilder from './employee-data-builder';

export default class EmployeeBuilder {
  private employeeData = EmployeeDataBuilder.aEmployee().build();

  private employee = Employee.create(this.employeeData).value as Employee;

  public static aEmployee(): EmployeeBuilder {
    return new EmployeeBuilder();
  }

  public withOneBenefit(): EmployeeBuilder {
    const benefit = BenefitBuilder.aBenefit().buildClass();
    this.employee.addBenefit(benefit);
    return this;
  }

  public withUniqueBenefit(): EmployeeBuilder {
    const uniqueBenefit = BenefitBuilder.aBenefit()
      .withMonthlyFrequency()
      .buildClass();
    this.employee.addBenefit(uniqueBenefit);
    return this;
  }

  public build(): Employee {
    return this.employee;
  }
}
