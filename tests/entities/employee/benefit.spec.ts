import BenefitDataBuilder from '../builders/benefit-data-builder';
import { left } from '../../../src/shared/either';
import Benefit from '../../../src/entities/employee/benefit';
import {
  InvalidBenefitFrequencyError,
  InvalidBenefitNameError,
  InvalidBenefitValueError,
} from '../../../src/entities/employee/errors/invalid-benefit';

describe('Benefit domain value object', () => {
  test('should not create benefit with invalid name (too few characters)', () => {
    const benefitWithFewCharactersInName = BenefitDataBuilder.aBenefit()
      .withFewCharactersInName()
      .build();
    const benefitOrError = Benefit.create(benefitWithFewCharactersInName);

    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitNameError(benefitWithFewCharactersInName.name)),
    );
  });

  test('should not create benefit with invalid name (too many characters)', () => {
    const benefitWithManyCharactersInName = BenefitDataBuilder.aBenefit()
      .withManyCharactersInName()
      .build();
    const benefitOrError = Benefit.create(benefitWithManyCharactersInName);

    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitNameError(benefitWithManyCharactersInName.name)),
    );
  });

  test('should not create benefit with invalid name (null value)', () => {
    const benefitWithNullValueInName = BenefitDataBuilder.aBenefit()
      .withNullValueInName()
      .build();
    const benefitOrError = Benefit.create(benefitWithNullValueInName);

    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitNameError(benefitWithNullValueInName.name)),
    );
  });

  test('should not create benefit with invalid value (zero value)', () => {
    const benefitWithZeroValue = BenefitDataBuilder.aBenefit()
      .withZeroValue()
      .build();

    const benefitOrError = Benefit.create(benefitWithZeroValue);
    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitValueError(benefitWithZeroValue.value)),
    );
  });

  test('should not create benefit with invalid value (null value)', () => {
    const benefitWithNullValue = BenefitDataBuilder.aBenefit()
      .withNullValue()
      .build();

    const benefitOrError = Benefit.create(benefitWithNullValue);
    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitValueError(benefitWithNullValue.value)),
    );
  });

  test('should not create benefit with invalid frequency (type snack)', () => {
    const benefitWithInvalidFrequencyForSnack = BenefitDataBuilder.aBenefit()
      .withInvalidFrequencyForSnack()
      .build();

    const benefitOrError = Benefit.create(benefitWithInvalidFrequencyForSnack);

    const { frequency, type } = benefitWithInvalidFrequencyForSnack;

    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should not create benefit with invalid frequency (type fuel)', () => {
    const benefitWithInvalidFrequencyForFuel = BenefitDataBuilder.aBenefit()
      .withInvalidFrequencyForFuel()
      .build();

    const benefitOrError = Benefit.create(benefitWithInvalidFrequencyForFuel);
    const { frequency, type } = benefitWithInvalidFrequencyForFuel;

    expect(benefitOrError.isRight()).toBe(false);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should return true when calling isUnique on a monthly frequency', () => {
    const benefitMonthly = BenefitDataBuilder.aBenefit()
      .withMonthlyFrequency()
      .build();
    const benefitOrError = Benefit.create(benefitMonthly);
    const benefit = benefitOrError.value as Benefit;

    expect(benefit.isUnique()).toBe(true);
  });

  test('should return false when calling isUnique on a daily frequency', () => {
    const benefitDaily = BenefitDataBuilder.aBenefit().build();
    const benefitOrError = Benefit.create(benefitDaily);
    const benefit = benefitOrError.value as Benefit;

    expect(benefit.isUnique()).toBe(false);
  });

  test('should create benefit with valid parameter', () => {
    const benefitValid = BenefitDataBuilder.aBenefit().build();

    const benefitOrError = Benefit.create(benefitValid);
    const benefit = benefitOrError.value as Benefit;

    expect(benefitOrError.isRight()).toEqual(true);
    expect(benefitOrError.isLeft()).toEqual(false);
    expect(benefitOrError.value).toBeInstanceOf(Benefit);
    expect(benefit.name).toEqual(benefit.name);
    expect(benefit.value).toEqual(benefit.value);
    expect(benefit.type).toEqual(benefit.type);
    expect(benefit.frequency).toEqual(benefit.frequency);
  });
});
