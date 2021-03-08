import { fail } from '@/shared/either';
import Benefit from '@/entities/employee/benefit';
import {
  InvalidBenefitFrequencyError,
  InvalidBenefitNameError,
  InvalidBenefitValueError,
} from '@/entities/employee/errors/invalid-benefit';
import BenefitBuilder from '@/tests/entities/builders/benefit-builder';

describe('Benefit domain value object', () => {
  test('should not create benefit with invalid name (too few characters)', () => {
    const benefitWithFewCharactersInName = BenefitBuilder.aBenefit()
      .withFewCharactersInName()
      .build();
    const benefitOrError = Benefit.create(benefitWithFewCharactersInName);

    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitNameError(benefitWithFewCharactersInName.name)),
    );
  });

  test('should not create benefit with invalid name (too many characters)', () => {
    const benefitWithManyCharactersInName = BenefitBuilder.aBenefit()
      .withManyCharactersInName()
      .build();
    const benefitOrError = Benefit.create(benefitWithManyCharactersInName);

    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitNameError(benefitWithManyCharactersInName.name)),
    );
  });

  test('should not create benefit with invalid name (null value)', () => {
    const benefitWithNullValueInName = BenefitBuilder.aBenefit()
      .withNullValueInName()
      .build();
    const benefitOrError = Benefit.create(benefitWithNullValueInName);

    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitNameError(benefitWithNullValueInName.name)),
    );
  });

  test('should not create benefit with invalid value (zero value)', () => {
    const benefitWithZeroValue = BenefitBuilder.aBenefit()
      .withZeroValue()
      .build();

    const benefitOrError = Benefit.create(benefitWithZeroValue);
    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitValueError(benefitWithZeroValue.value)),
    );
  });

  test('should not create benefit with invalid value (null value)', () => {
    const benefitWithNullValue = BenefitBuilder.aBenefit()
      .withNullValue()
      .build();

    const benefitOrError = Benefit.create(benefitWithNullValue);
    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitValueError(benefitWithNullValue.value)),
    );
  });

  test('should not create benefit with invalid frequency (type snack)', () => {
    const benefitWithInvalidFrequencyForSnack = BenefitBuilder.aBenefit()
      .withInvalidFrequencyForSnack()
      .build();

    const benefitOrError = Benefit.create(benefitWithInvalidFrequencyForSnack);

    const { frequency, type } = benefitWithInvalidFrequencyForSnack;

    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should not create benefit with invalid frequency (type fuel)', () => {
    const benefitWithInvalidFrequencyForFuel = BenefitBuilder.aBenefit()
      .withInvalidFrequencyForFuel()
      .build();

    const benefitOrError = Benefit.create(benefitWithInvalidFrequencyForFuel);
    const { frequency, type } = benefitWithInvalidFrequencyForFuel;

    expect(benefitOrError.isSuccess()).toBe(false);
    expect(benefitOrError).toEqual(
      fail(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should return true when calling isUnique on a monthly frequency', () => {
    const benefitMonthly = BenefitBuilder.aBenefit()
      .withMonthlyFrequency()
      .build();
    const benefitOrError = Benefit.create(benefitMonthly);
    const benefit = benefitOrError.value as Benefit;

    expect(benefit.isUnique()).toBe(true);
  });

  test('should return false when calling isUnique on a daily frequency', () => {
    const benefitDaily = BenefitBuilder.aBenefit().build();
    const benefitOrError = Benefit.create(benefitDaily);
    const benefit = benefitOrError.value as Benefit;

    expect(benefit.isUnique()).toBe(false);
  });

  test('should create benefit with valid parameter', () => {
    const benefitValid = BenefitBuilder.aBenefit().build();

    const benefitOrError = Benefit.create(benefitValid);
    const benefit = benefitOrError.value as Benefit;

    expect(benefitOrError.isFail()).toEqual(false);
    expect(benefitOrError.isSuccess()).toEqual(true);
    expect(benefitOrError.value).toBeInstanceOf(Benefit);
    expect(benefit.name).toEqual(benefit.name);
    expect(benefit.value).toEqual(benefit.value);
    expect(benefit.type).toEqual(benefit.type);
    expect(benefit.frequency).toEqual(benefit.frequency);
  });
});
