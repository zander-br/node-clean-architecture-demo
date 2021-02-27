import { Either, left, right } from '../../shared/either';
import { InvalidNameError } from './errors/invalid-name';

export default class Contract {
  private constructor(private readonly contract: string) {
    Object.freeze(this);
  }

  static create(contract: string): Either<InvalidNameError, Contract> {
    if (!Contract.validate(contract)) {
      return left(new InvalidNameError(contract));
    }

    return right(new Contract(contract));
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
