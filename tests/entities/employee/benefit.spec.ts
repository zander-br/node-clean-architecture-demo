import Benefit from '../../../src/entities/employee/benefit';
import { left } from '../../../src/shared/either';
import { BenefitData } from '../../../src/entities/employee/benefit-data';
import { InvalidBenefitNameError } from '../../../src/entities/employee/errors/invalid-benefit';

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
});
