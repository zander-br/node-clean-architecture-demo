import { Employee } from '../../../src/entities/employee/employee';
import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
import { left } from '../../../src/shared/either';

describe('Employee domain entity', () => {
  test('should not create employee with invalid name (too few characters)', () => {
    const name = 'A';
    const employee = Employee.create({ name });
    expect(employee).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create employee with invalid name (too many characters)', () => {
    let name = '';
    for (let i = 0; i < 256; i++) {
      name += 'c';
    }

    const employee = Employee.create({ name });
    expect(employee).toEqual(left(new InvalidNameError(name)));
  });

  test('should not create employee with invalid name (only blank spaces)', async () => {
    const name = '   ';
    const employee = Employee.create({ name });
    expect(employee).toEqual(left(new InvalidNameError(name)));
  });
});
