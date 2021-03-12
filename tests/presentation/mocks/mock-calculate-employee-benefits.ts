import { success } from '@/shared/either';
import BenefitBuilder from '@/tests/entities/builders/benefit-builder';
import { ICalculateEmployeeBenefits } from '@/usecases/calculate-employee-benefits';
import { CalculateBenefitsData } from '@/usecases/calculate-employee-benefits/calculate-benefits-data';
import { CalculateEmployeeBenefitsResponse } from '@/usecases/calculate-employee-benefits/calculate-employee-benefit-response';

export class CalculateEmployeeBenefitsMock
  implements ICalculateEmployeeBenefits {
  params: CalculateBenefitsData;

  async execute(
    calculateBenefitsData: CalculateBenefitsData,
  ): Promise<CalculateEmployeeBenefitsResponse> {
    this.params = calculateBenefitsData;
    const benefit = BenefitBuilder.aBenefit().buildClass();
    return success([benefit]);
  }
}
