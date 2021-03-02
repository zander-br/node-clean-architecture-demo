import { InvalidContractError } from '../../../src/entities/employee/errors/invalid-contract';
import Contract from '../../../src/entities/employee/contract';
import { fail } from '../../../src/shared/either';

describe('Contract domain value object', () => {
  test('should not create contract with invalid parameter (too few characters)', () => {
    const value = 'A';
    const contract = Contract.create(value);
    expect(contract.isSuccess()).toBe(false);
    expect(contract).toEqual(fail(new InvalidContractError(value)));
  });

  test('should not create contract with invalid parameter (too many characters)', () => {
    let value = '';
    for (let i = 0; i < 256; i++) {
      value += 'c';
    }

    const contract = Contract.create(value);
    expect(contract.isSuccess()).toBe(false);
    expect(contract).toEqual(fail(new InvalidContractError(value)));
  });

  test('should not create contract with invalid parameter (only blank spaces)', () => {
    const value = '   ';
    const contract = Contract.create(value);
    expect(contract.isSuccess()).toBe(false);
    expect(contract).toEqual(fail(new InvalidContractError(value)));
  });

  test('should create contract with valid parameter', () => {
    const value = 'São Luis';
    const contractOrError = Contract.create(value);
    const contract = contractOrError.value as Contract;
    expect(contractOrError.isFail()).toBe(false);
    expect(contractOrError.isSuccess()).toEqual(true);
    expect(contractOrError.value).toBeInstanceOf(Contract);
    expect(contract.value).toEqual(value);
  });
});
