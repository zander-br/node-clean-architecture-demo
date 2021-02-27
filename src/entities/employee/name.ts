import { Either, left, right } from '../../shared/either';
import { InvalidNameError } from './errors/invalid-name';

export default class Name {
  private constructor(private readonly name: string) {
    Object.freeze(this);
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name));
    }

    return right(new Name(name));
  }

  get value(): string {
    return this.name;
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false;
    }

    return true;
  }
}
