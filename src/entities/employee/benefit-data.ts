import { BenefitType, Frequency } from './benefit';

export interface BenefitData {
  name: string;
  value: number;
  type: BenefitType;
  frequency: Frequency;
}
