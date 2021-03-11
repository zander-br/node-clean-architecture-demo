import { CalculateBenefitsData } from './calculate-employee-benefits/calculate-benefits-data';
import { CalculateEmployeeBenefitsResponse } from './calculate-employee-benefits/calculate-employee-benefit-response';

export interface ICalculateEmployeeBenefits {
  execute: (
    calculateBenefitsData: CalculateBenefitsData,
  ) => Promise<CalculateEmployeeBenefitsResponse>;
}
