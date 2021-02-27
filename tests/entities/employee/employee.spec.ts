import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
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
});
