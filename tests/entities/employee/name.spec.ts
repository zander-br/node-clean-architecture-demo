import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
import Name from '../../../src/entities/employee/name';
import { fail } from '../../../src/shared/either';

describe('Name domain value object', () => {
  test('should not create name with invalid parameter (too few characters)', () => {
    const value = 'A';
    const name = Name.create(value);
    expect(name.isSuccess()).toBe(false);
    expect(name).toEqual(fail(new InvalidNameError(value)));
  });

  test('should not create name with invalid parameter (too many characters)', () => {
    let value = '';
    for (let i = 0; i < 256; i++) {
      value += 'c';
    }

    const name = Name.create(value);
    expect(name.isSuccess()).toBe(false);
    expect(name).toEqual(fail(new InvalidNameError(value)));
  });

  test('should not create name with invalid parameter (only blank spaces)', () => {
    const value = '   ';
    const name = Name.create(value);
    expect(name.isSuccess()).toBe(false);
    expect(name).toEqual(fail(new InvalidNameError(value)));
  });

  test('should create name with valid parameter', () => {
    const value = 'Anderson Santos';
    const nameOrError = Name.create(value);
    const name = nameOrError.value as Name;
    expect(nameOrError.isFail()).toEqual(false);
    expect(nameOrError.isSuccess()).toEqual(true);
    expect(nameOrError.value).toBeInstanceOf(Name);
    expect(name.value).toEqual(value);
  });
});
