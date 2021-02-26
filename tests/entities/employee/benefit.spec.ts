import Benefit, {
  BenefitType,
  Frequency,
} from '../../../src/entities/employee/benefit';
import { left } from '../../../src/shared/either';
import { BenefitData } from '../../../src/entities/employee/benefit-data';
import {
  InvalidBenefitFrequencyError,
  InvalidBenefitNameError,
  InvalidBenefitValueError,
} from '../../../src/entities/employee/errors/invalid-benefit';

describe('Benefit domain value object', () => {
  test('should not create benefit with invalid name (too few characters)', () => {
    const name = 'A';
    const benefitData: BenefitData = {
      name,
      value: 10,
      type: 'Food',
      frequency: 'Daily',
    };
    const benefitOrError = Benefit.create(benefitData);

    expect(benefitOrError).toEqual(left(new InvalidBenefitNameError(name)));
  });

  test('should not create benefit with invalid name (too many characters)', () => {
    let name = '';
    for (let i = 0; i < 256; i++) {
      name += 'c';
    }

    const benefitData: BenefitData = {
      name,
      value: 10,
      type: 'Food',
      frequency: 'Daily',
    };

    const benefitOrError = Benefit.create(benefitData);
    expect(benefitOrError).toEqual(left(new InvalidBenefitNameError(name)));
  });

  test('should not create benefit with invalid name (null value)', () => {
    const name = null;

    const benefitData: BenefitData = {
      name,
      value: 10,
      type: 'Food',
      frequency: 'Daily',
    };

    const benefitOrError = Benefit.create(benefitData);
    expect(benefitOrError).toEqual(left(new InvalidBenefitNameError(name)));
  });

  test('should not create benefit with invalid value (zero value)', () => {
    const value = 0;

    const benefitData: BenefitData = {
      name: 'BOM',
      value,
      type: 'Food',
      frequency: 'Daily',
    };

    const benefitOrError = Benefit.create(benefitData);
    expect(benefitOrError).toEqual(left(new InvalidBenefitValueError(value)));
  });

  test('should not create benefit with invalid value (null value)', () => {
    const value = null;

    const benefitData: BenefitData = {
      name: 'BOM',
      value,
      type: 'Food',
      frequency: 'Daily',
    };

    const benefitOrError = Benefit.create(benefitData);
    expect(benefitOrError).toEqual(left(new InvalidBenefitValueError(value)));
  });

  test('should not create benefit with invalid frequency (type snack)', () => {
    const frequency: Frequency = 'Daily';
    const type: BenefitType = 'Snack';

    const benefitData: BenefitData = {
      name: 'VR Alimentação',
      value: 10,
      type,
      frequency,
    };

    const benefitOrError = Benefit.create(benefitData);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });

  test('should not create benefit with invalid frequency (type fuel)', () => {
    const frequency: Frequency = 'Daily';
    const type: BenefitType = 'Fuel';

    const benefitData: BenefitData = {
      name: 'VR Auto',
      value: 10,
      type,
      frequency,
    };

    const benefitOrError = Benefit.create(benefitData);
    expect(benefitOrError).toEqual(
      left(new InvalidBenefitFrequencyError(frequency, type)),
    );
  });
});
