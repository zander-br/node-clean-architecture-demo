import { Either, fail, success } from '../../shared/either';
import { InvalidContractError } from './errors/invalid-contract';

export default class Contract {
  private constructor(private readonly contract: string) {
    Object.freeze(this);
  }

  static create(contract: string): Either<InvalidContractError, Contract> {
    if (!Contract.validate(contract)) {
      return fail(new InvalidContractError(contract));
    }

    return success(new Contract(contract));
  }

  get value(): string {
    return this.contract;
  }

  static validate(contract: string): boolean {
    if (
      !contract ||
      contract.trim().length < 2 ||
      contract.trim().length > 255
    ) {
      return false;
    }

    return true;
  }
}
