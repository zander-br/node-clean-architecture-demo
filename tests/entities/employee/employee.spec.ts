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
});
