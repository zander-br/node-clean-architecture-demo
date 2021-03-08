import { fail, success } from '@/shared/either';
import { NotFoundEmployeeError } from '../errors/calculate-employee-benefits';
import { EmployeeRepository } from '../ports/employee-repository';
import { CalculateBenefitsData } from './calculate-benefits-data';
import { CalculateEmployeeBenefitsResponse } from './calculate-employee-benefit-response';

export default class CalculateEmployeeBenefits {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute({
    name,
  }: CalculateBenefitsData): Promise<CalculateEmployeeBenefitsResponse> {
    const employee = await this.employeeRepository.findByName(name);
    if (!employee) {
      return fail(new NotFoundEmployeeError(name));
    }

    return success(true);
  }
}
