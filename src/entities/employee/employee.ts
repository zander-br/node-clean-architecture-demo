import { Either, fail, success } from '../../shared/either';
import Benefit, { BenefitType, Frequency } from './benefit';
import Contract from './contract';
import { EmployeeData } from './employee-data';
import { InvalidContractError } from './errors/invalid-contract';
import {
  BenefitsEmptyError,
  DuplicateBenefitError,
  UniqueBenefitError,
} from './errors/invalid-employee';
import { InvalidNameError } from './errors/invalid-name';
import Name from './name';

type CalculateBenefitsParms = {
  worksDays: number;
  daysAtHomeOffice?: number;
};

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

  public addBenefit(benefit: Benefit): Either<DuplicateBenefitError, Benefit> {
    if (this.existsBenefitForName(benefit.name)) {
      return fail(new DuplicateBenefitError(benefit));
    }

    if (this.isUniqueAndExistsType(benefit)) {
      return fail(new UniqueBenefitError(benefit));
    }

    this.#benefits.push(benefit);
    return success(benefit);
  }

  public calculateBenefits({
    worksDays,
    daysAtHomeOffice,
  }: CalculateBenefitsParms): Either<BenefitsEmptyError, Benefit[]> {
    if (!this.hasBenefits()) {
      return fail(new BenefitsEmptyError());
    }

    if (this.medicalLeave) {
      return success(this.getBenefitsByType('Snack'));
    }

    const totalDays = worksDays + daysAtHomeOffice;
    const foodDays = this.mealVoucherDiscount ? worksDays : totalDays;
    const transportationDays = this.transportationVoucherDiscount
      ? worksDays
      : totalDays;

    const benefitsMonthly = this.getBenefitsByFrequency('Monthly');
    const benefitsDaily = this.getBenefitsByFrequency('Daily');

    const foodsBenefits = benefitsDaily
      .filter(benefit => benefit.type === 'Food')
      .map(benefit => this.calculateBenefitValue(benefit, foodDays));
    const transportationsBenefits = benefitsDaily
      .filter(benefit => benefit.type === 'Transport')
      .map(benefit => this.calculateBenefitValue(benefit, transportationDays));

    return success([
      ...benefitsMonthly,
      ...foodsBenefits,
      ...transportationsBenefits,
    ]);
  }

  public getBenefitsByType(type: BenefitType): Benefit[] {
    return this.#benefits.filter(benefit => benefit.type === type);
  }

  public getBenefitsByFrequency(frequency: Frequency): Benefit[] {
    return this.#benefits.filter(benefit => benefit.frequency === frequency);
  }

  public hasBenefits = (): boolean => this.#benefits.length > 0;

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

  private calculateBenefitValue(benefit: Benefit, days: number) {
    const value = benefit.value * days;
    const calculateBenefit = Benefit.create({ ...benefit, value });
    return calculateBenefit.value as Benefit;
  }

  get benefits(): Benefit[] {
    return this.#benefits;
  }
}
