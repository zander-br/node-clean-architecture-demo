import { fail, success } from '@/shared/either';
import { NotFoundEmployeeError } from '../errors/calculate-employee-benefits';
import { EmployeeRepository } from '../ports/employee-repository';
import { CalculateBenefitsData } from './calculate-benefits-data';
import { CalculateEmployeeBenefitsResponse } from './calculate-employee-benefit-response';
import { ICalculateEmployeeBenefits } from '../calculate-employee-benefits';

export default class CalculateEmployeeBenefits
  implements ICalculateEmployeeBenefits {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(
    calculateBenefitsData: CalculateBenefitsData,
  ): Promise<CalculateEmployeeBenefitsResponse> {
    const { name } = calculateBenefitsData;
    const employee = await this.employeeRepository.findByName(name);
    if (!employee) {
      return fail(new NotFoundEmployeeError(name));
    }

    const calculateBenefitsOrError = employee.calculateBenefits(
      calculateBenefitsData,
    );

    if (calculateBenefitsOrError.isFail()) {
      return fail(calculateBenefitsOrError.value);
    }

    const benefits = calculateBenefitsOrError.value;

    return success(benefits);
  }
}
