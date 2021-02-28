import { BenefitData } from '../../../src/entities/employee/benefit-data';

export default class BenefitDataBuilder {
  private benefit: BenefitData = {
    name: 'VR Refeição',
    value: 22,
    type: 'Food',
    frequency: 'Daily',
  };

  public static aBenefit(): BenefitDataBuilder {
    return new BenefitDataBuilder();
  }

  public withInvalidName(): BenefitDataBuilder {
    this.benefit.name = '';
    return this;
  }

  public withFewCharactersInName(): BenefitDataBuilder {
    this.benefit.name = 'A';
    return this;
  }

  public withManyCharactersInName(): BenefitDataBuilder {
    let name = '';
    for (let i = 0; i < 256; i++) {
      name += 'c';
    }

    this.benefit.name = name;
    return this;
  }

  public withNullValueInName(): BenefitDataBuilder {
    this.benefit.name = null;
    return this;
  }

  public withInvalidValue(): BenefitDataBuilder {
    this.benefit.value = 0;
    return this;
  }

  public withZeroValue(): BenefitDataBuilder {
    this.benefit.value = 0;
    return this;
  }

  public withNullValue(): BenefitDataBuilder {
    this.benefit.value = null;
    return this;
  }

  public withInvalidFrequency(): BenefitDataBuilder {
    this.benefit.frequency = 'Daily';
    this.benefit.type = 'Snack';
    return this;
  }

  public withInvalidFrequencyForSnack(): BenefitDataBuilder {
    this.benefit.frequency = 'Daily';
    this.benefit.type = 'Snack';
    return this;
  }

  public withInvalidFrequencyForFuel(): BenefitDataBuilder {
    this.benefit.frequency = 'Daily';
    this.benefit.type = 'Fuel';
    return this;
  }

  public build(): BenefitData {
    return this.benefit;
  }
}
