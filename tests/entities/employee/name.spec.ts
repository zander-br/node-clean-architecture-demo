import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
import { Name } from '../../../src/entities/employee/name';
import { left } from '../../../src/shared/either';

describe('Name domain value object', () => {
  test('should not create name with invalid parameter (too few characters)', () => {
    const value = 'A';
    const name = Name.create(value);
    expect(name).toEqual(left(new InvalidNameError(value)));
  });

  test('should not create name with invalid parameter (too many characters)', () => {
    let value = '';
    for (let i = 0; i < 256; i++) {
      value += 'c';
    }

    const name = Name.create(value);
    expect(name).toEqual(left(new InvalidNameError(value)));
  });

  test('should not create name with invalid parameter (only blank spaces)', async () => {
    const value = '   ';
    const name = Name.create(value);
    expect(name).toEqual(left(new InvalidNameError(value)));
  });
});
