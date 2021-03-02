import { Either, fail, success } from '../../shared/either';
import Benefit from './benefit';
import Contract from './contract';
import { EmployeeData } from './employee-data';
import { InvalidContractError } from './errors/invalid-contract';
import {
  DuplicateBenefitError,
  UniqueBenefitError,
} from './errors/invalid-employee';
import { InvalidNameError } from './errors/invalid-name';
import Name from './name';

export default class Employee {
  readonly #benefits: Benefit[];

  private constructor(
    readonly name: Name,
    readonly contract: Contract,
    readonly medicalLeave: boolean = false,
    readonly transportationVoucherDiscount: boolean = true,
    readonly mealVoucherDiscount: boolean = true,
  ) {
    this.#benefits = [];
    Object.freeze(this);
  }

  static create(
    employeeData: EmployeeData,
  ): Either<InvalidNameError | InvalidContractError, Employee> {
    const nameOrError = Name.create(employeeData.name);
    if (nameOrError.isFail()) return fail(nameOrError.value);

    const contractOrError = Contract.create(employeeData.contract);
    if (contractOrError.isFail()) return fail(contractOrError.value);

    const name = nameOrError.value;
    const contract = contractOrError.value;
    return success(
      new Employee(
        name,
        contract,
        employeeData.medicalLeave,
        employeeData.transportationVoucherDiscount,
        employeeData.mealVoucherDiscount,
      ),
    );
  }

  public addBenefit(benefit: Benefit): Either<DuplicateBenefitError, true> {
    if (this.existsBenefitForName(benefit.name)) {
      return fail(new DuplicateBenefitError(benefit));
    }

    if (this.isUniqueAndExistsType(benefit)) {
      return fail(new UniqueBenefitError(benefit));
    }

    this.#benefits.push(benefit);
    return success(true);
  }

  private existsBenefitForName(name: string) {
    return this.#benefits.find(
      benefit => benefit.name.toLowerCase() === name.toLowerCase(),
    );
  }

  private isUniqueAndExistsType(benefit: Benefit) {
    return (
      benefit.isUnique() &&
      this.#benefits.findIndex(({ type }) => type === benefit.type) >= 0
    );
  }

  get benefits(): Benefit[] {
    return this.#benefits;
  }
}
