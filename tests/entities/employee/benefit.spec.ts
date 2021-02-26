import BenefitBuilder from '../builders/benefit-builder';
import { left } from '../../../src/shared/either';
import Benefit from '../../../src/entities/employee/benefit';
import {
  InvalidBenefitFrequencyError,
  InvalidBenefitNameError,
  InvalidBenefitValueError,
} from '../../../src/entities/employee/errors/invalid-benefit';

describe('Benefit domain value object', () => {
  test('should not create benefit with invalid name (too few characters)', () => {
    const benefitDataWithFewCharactersInName = BenefitBuilder.aBenefit()
      .withFewCharactersInName()
      .build();
    const benefitOrError = Benefit.create(benefitDataWithFewCharactersInName);

    expect(benefitOrError).toEqual(
      left(
        new InvalidBenefitNameError(benefitDataWithFewCharactersInName.name),
      ),
    );
  });

  test('should not create benefit with invalid name (too many characters)', () => {
    const benefitDataWithManyCharactersInName = BenefitBuilder.aBenefit()
      .withManyCharactersInName()
      .build();
    const benefitOrError = Benefit.create(benefitDataWithManyCharactersInName);

    expect(benefitOrError).toEqual(
      left(
        new InvalidBenefitNameError(benefitDataWithManyCharactersInName.name),
      ),
    );
  });

  test('should not create benefit with invalid name (null value)', () => {
    const benefitDataWithNullValueInName = BenefitBuilder.aBenefit()
      .withNullValueInName()
      .build();
    const benefitOrError = Benefit.create(benefitDataWithNullValueInName);

    expect(benefitOrError).toEqual(
      left(new InvalidBenefitNameError(benefitDataWithNullValueInName.name)),
    );
  });

  test('should not create benefit with invalid value (zero value)', () => {
    const benefitDataWithZeroValue = BenefitBuilder.aBenefit()
      .withZeroValue()
      .build();

    const benefitOrError = Benefit.create(benefitDataWithZeroValue);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitValueError(benefitDataWithZeroValue.value)),
    );
  });

  test('should not create benefit with invalid value (null value)', () => {
    const benefitDataWithNullValue = BenefitBuilder.aBenefit()
      .withNullValue()
      .build();

    const benefitOrError = Benefit.create(benefitDataWithNullValue);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitValueError(benefitDataWithNullValue.value)),
    );
  });

  test('should not create benefit with invalid frequency (type snack)', () => {
    const benefitDataWithInvalidFrequencyForSnack = BenefitBuilder.aBenefit()
      .withInvalidFrequencyForSnack()
      .build();

    const benefitOrError = Benefit.create(
      benefitDataWithInvalidFrequencyForSnack,
    );

    const { frequency, type } = benefitDataWithInvalidFrequencyForSnack;

    expect(benefitOrError).toEqual(
      left(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should not create benefit with invalid frequency (type fuel)', () => {
    const benefitDataWithInvalidFrequencyForFuel = BenefitBuilder.aBenefit()
      .withInvalidFrequencyForFuel()
      .build();

    const benefitOrError = Benefit.create(
      benefitDataWithInvalidFrequencyForFuel,
    );

    const { frequency, type } = benefitDataWithInvalidFrequencyForFuel;

    expect(benefitOrError).toEqual(
      left(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should create benefit with valid parameter', () => {
    const benefitData = BenefitBuilder.aBenefit().build();

    const benefitOrError = Benefit.create(benefitData);
    const benefit = benefitOrError.value as Benefit;

    expect(benefitOrError.isRight()).toEqual(true);
    expect(benefitOrError.value).toBeInstanceOf(Benefit);
    expect(benefit.name).toEqual(benefitData.name);
    expect(benefit.value).toEqual(benefitData.value);
    expect(benefit.type).toEqual(benefitData.type);
    expect(benefit.frequency).toEqual(benefitData.frequency);
  });
});
