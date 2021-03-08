import { Either, fail, success } from '@/shared/either';
import { BenefitData } from './benefit-data';
import {
  InvalidBenefitFrequencyError,
  InvalidBenefitNameError,
  InvalidBenefitValueError,
} from './errors/invalid-benefit';

export type BenefitType = 'Food' | 'Snack' | 'Transport' | 'Fuel';

export type Frequency = 'Monthly' | 'Daily';

export default class Benefit {
  private constructor(
    readonly name: string,
    readonly value: number,
    readonly type: BenefitType,
    readonly frequency: Frequency,
  ) {
    Object.freeze(this);
  }

  static create(
    benefitData: BenefitData,
  ): Either<
    | InvalidBenefitNameError
    | InvalidBenefitValueError
    | InvalidBenefitFrequencyError,
    Benefit
  > {
    const { name, value, type, frequency } = benefitData;

    if (!Benefit.validateName(name)) {
      return fail(new InvalidBenefitNameError(name));
    }

    if (!Benefit.validateValue(value)) {
      return fail(new InvalidBenefitValueError(value));
    }

    if (!Benefit.validateFrequency(frequency, type)) {
      return fail(new InvalidBenefitFrequencyError(frequency, type));
    }

    const benefit = new Benefit(name, value, type, frequency);
    return success(benefit);
  }

  public isUnique(): boolean {
    return this.frequency === 'Monthly';
  }

  private static validateName(name: string) {
    return name !== null && name.trim().length > 2 && name.trim().length < 255;
  }

  private static validateValue(value: number) {
    return value > 0;
  }

  private static validateFrequency(frequency: Frequency, type: BenefitType) {
    if (type === 'Snack' && frequency !== 'Monthly') return false;
    if (type === 'Fuel' && frequency !== 'Monthly') return false;

    return true;
  }
}
