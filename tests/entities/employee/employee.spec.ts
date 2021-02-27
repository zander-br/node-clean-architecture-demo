import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
import { InvalidContractError } from '../../../src/entities/employee/errors/invalid-contract';
import Employee from '../../../src/entities/employee/employee';
import { left } from '../../../src/shared/either';
import EmployeeBuilder from '../builders/employee-builder';

describe('Employee domain entity', () => {
  test('should not create employee with invalid name', () => {
    const employeeWithInvalidName = EmployeeBuilder.aEmployee()
      .withInvalidName()
      .build();

    const employeeOrError = Employee.create(employeeWithInvalidName);
    expect(employeeOrError).toEqual(
      left(new InvalidNameError(employeeWithInvalidName.name)),
    );
  });

  test('should not create employee with invalid contract', () => {
    const employeeWithInvalidContract = EmployeeBuilder.aEmployee()
      .withInvalidContract()
      .build();

    const employeeOrError = Employee.create(employeeWithInvalidContract);
    expect(employeeOrError).toEqual(
      left(new InvalidContractError(employeeWithInvalidContract.contract)),
    );
  });

  test('should create employee without medical leave when not informed', () => {
    const employeeWithoutMedicalLeave = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeWithoutMedicalLeave);
    const employee = employeeOrError.value as Employee;
    expect(employee.medicalLeave).toBe(false);
  });

  test('should create employee with medical leave when informed', () => {
    const employeeWithMedicalLeave = EmployeeBuilder.aEmployee()
      .withMedicalLeave()
      .build();
    const employeeOrError = Employee.create(employeeWithMedicalLeave);
    const employee = employeeOrError.value as Employee;
    expect(employee.medicalLeave).toBe(true);
  });

  test('should create employee with transportation voucher discount when not informed', () => {
    const employeeWithTransportationVoucherDiscount = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(
      employeeWithTransportationVoucherDiscount,
    );
    const employee = employeeOrError.value as Employee;
    expect(employee.transportationVoucherDiscount).toBe(true);
  });

  test('should create employee without transportation voucher discount when informed', () => {
    const employeeWithoutTransportationVoucherDiscount = EmployeeBuilder.aEmployee()
      .withoutTransportationVoucherDiscount()
      .build();
    const employeeOrError = Employee.create(
      employeeWithoutTransportationVoucherDiscount,
    );
    const employee = employeeOrError.value as Employee;
    expect(employee.transportationVoucherDiscount).toBe(false);
  });

  test('should create employee with meal voucher discount when not informed', () => {
    const employeeWithMealVoucherDiscount = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeWithMealVoucherDiscount);
    const employee = employeeOrError.value as Employee;
    expect(employee.mealVoucherDiscount).toBe(true);
  });
});
