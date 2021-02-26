import { Either, left, right } from '../../shared/either';
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
      return left(new InvalidBenefitNameError(name));
    }

    if (!Benefit.validateValue(value)) {
      return left(new InvalidBenefitValueError(value));
    }

    if (!Benefit.validateFrequency(frequency, type)) {
      return left(new InvalidBenefitFrequencyError(frequency, type));
    }

    const benefit = new Benefit(name, value, type, frequency);
    return right(benefit);
  }

  private static validateName(name: string): boolean {
    return name !== null && name.trim().length > 2 && name.trim().length < 255;
  }

  private static validateValue(value: number): boolean {
    return value > 0;
  }

  private static validateFrequency(frequency: Frequency, type: BenefitType) {
    if (type === 'Snack' && frequency !== 'Monthly') return false;

    return true;
  }
}
