import { Either, left, right } from '../../shared/either';
import { BenefitData } from './benefit-data';
import { InvalidBenefitNameError } from './errors/invalid-benefit';

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

  static create({
    name,
    value,
    type,
    frequency,
  }: BenefitData): Either<InvalidBenefitNameError, Benefit> {
    if (!Benefit.validateName(name)) {
      return left(new InvalidBenefitNameError(name));
    }

    const benefit = new Benefit(name, value, type, frequency);
    return right(benefit);
  }

  private static validateName(name: string): boolean {
    return name !== null && name.trim().length > 2 && name.trim().length < 255;
  }
}
