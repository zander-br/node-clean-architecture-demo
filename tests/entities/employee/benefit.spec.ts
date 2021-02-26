import Benefit from '../../../src/entities/employee/benefit';
import { left } from '../../../src/shared/either';
import { BenefitData } from '../../../src/entities/employee/benefit-data';
import { InvalidBenefitNameError } from '../../../src/entities/employee/errors/invalid-benefit';

describe('Benefit domain value object', () => {
  test('should not create benefit with invalid name (too few characters)', () => {
    const value = 'A';
    const benefitData: BenefitData = {
      name: 'A',
      value: 10,
      type: 'Food',
      frequency: 'Daily',
    };
    const benefitOrError = Benefit.create(benefitData);

    expect(benefitOrError).toEqual(left(new InvalidBenefitNameError(value)));
  });
});
