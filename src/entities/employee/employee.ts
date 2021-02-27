import { Either, left, right } from '../../shared/either';
import Contract from './contract';
import { EmployeeData } from './employee-data';
import { InvalidContractError } from './errors/invalid-contract';
import { InvalidNameError } from './errors/invalid-name';
import Name from './name';

export default class Employee {
  private constructor(
    readonly name: Name,
    readonly contract: Contract,
    readonly medicalLeave: boolean = false,
    readonly transportationVoucherDiscount: boolean = true,
    readonly mealVoucherDiscount: boolean = true,
  ) {
    Object.freeze(this);
  }

  static create(
    employeeData: EmployeeData,
  ): Either<InvalidNameError | InvalidContractError, Employee> {
    const nameOrError = Name.create(employeeData.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const contractOrError = Contract.create(employeeData.contract);
    if (contractOrError.isLeft()) return left(contractOrError.value);

    const name = nameOrError.value;
    const contract = contractOrError.value;
    return right(
      new Employee(
        name,
        contract,
        employeeData.medicalLeave,
        employeeData.transportationVoucherDiscount,
        employeeData.mealVoucherDiscount,
      ),
    );
  }
}
