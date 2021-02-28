import Benefit from '../../../src/entities/employee/benefit';
import BenefitDataBuilder from './benefit-data-builder';

export default class BenefitBuilder {
  private benefitData = BenefitDataBuilder.aBenefit().build();

  private benefit = Benefit.create(this.benefitData).value as Benefit;

  public static aBenefit(): BenefitBuilder {
    return new BenefitBuilder();
  }

  public build(): Benefit {
    return this.benefit;
  }
}
