import { Either, left, right } from '../../shared/either';
import { EmployeeData } from './employee-data';
import { InvalidNameError } from './errors/invalid-name';
import { Name } from './name';

export class Employee {
  public readonly name: Name;

  private constructor(name: Name) {
    this.name = name;
    Object.freeze(this);
  }

  static create(
    employeeData: EmployeeData,
  ): Either<InvalidNameError, Employee> {
    const nameOrError = Name.create(employeeData.name);

    if (nameOrError.isLeft()) return left(nameOrError.value);

    const name = nameOrError.value;
    return right(new Employee(name));
  }
}
