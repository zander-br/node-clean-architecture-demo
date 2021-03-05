import Benefit from '../../../src/entities/employee/benefit';
import { BenefitData } from '../../../src/entities/employee/benefit-data';

export default class BenefitBuilder {
  private benefit: BenefitData = {
    name: 'VR Refeição',
    value: 22,
    type: 'Food',
    frequency: 'Daily',
  };

  public static aBenefit(): BenefitBuilder {
    return new BenefitBuilder();
  }

  public withInvalidName(): BenefitBuilder {
    this.benefit.name = '';
    return this;
  }

  public withAnotherName(): BenefitBuilder {
    this.benefit.name = 'Another name';
    return this;
  }

  public withFewCharactersInName(): BenefitBuilder {
    this.benefit.name = 'A';
    return this;
  }

  public withManyCharactersInName(): BenefitBuilder {
    let name = '';
    for (let i = 0; i < 256; i++) {
      name += 'c';
    }

    this.benefit.name = name;
    return this;
  }

  public withNullValueInName(): BenefitBuilder {
    this.benefit.name = null;
    return this;
  }

  public withInvalidValue(): BenefitBuilder {
    this.benefit.value = 0;
    return this;
  }

  public withZeroValue(): BenefitBuilder {
    this.benefit.value = 0;
    return this;
  }

  public withNullValue(): BenefitBuilder {
    this.benefit.value = null;
    return this;
  }

  public withInvalidFrequency(): BenefitBuilder {
    this.benefit.frequency = 'Daily';
    this.benefit.type = 'Snack';
    return this;
  }

  public withInvalidFrequencyForSnack(): BenefitBuilder {
    this.benefit.frequency = 'Daily';
    this.benefit.type = 'Snack';
    return this;
  }

  public withSnackType(): BenefitBuilder {
    this.benefit.frequency = 'Monthly';
    this.benefit.type = 'Snack';
    this.benefit.value = 150;
    this.benefit.name = 'VR Alimentação';
    return this;
  }

  public withTransportType(): BenefitBuilder {
    this.benefit.type = 'Transport';
    this.benefit.value = 8.8;
    this.benefit.name = 'Bilhete Único';
    return this;
  }

  public withInvalidFrequencyForFuel(): BenefitBuilder {
    this.benefit.frequency = 'Daily';
    this.benefit.type = 'Fuel';
    return this;
  }

  public withMonthlyFrequency(): BenefitBuilder {
    this.benefit.frequency = 'Monthly';
    this.benefit.type = 'Snack';
    return this;
  }

  public build(): BenefitData {
    return this.benefit;
  }

  public buildClass(): Benefit {
    const benefitClass = Benefit.create(this.benefit).value as Benefit;
    return benefitClass;
  }
}
