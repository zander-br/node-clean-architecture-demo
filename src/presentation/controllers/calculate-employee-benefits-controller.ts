import { ICalculateEmployeeBenefits } from '@/usecases/calculate-employee-benefits';
import { MissingParamError } from '../errors';
import { badRequest, ok, serverError } from '../helpers';
import { Controller, HttpResponse } from '../ports';

export class CalculateEmployeeBenefitsController implements Controller {
  constructor(
    private readonly calculateEmployeeBenefits: ICalculateEmployeeBenefits,
  ) {}

  async handle(
    request: CalculateEmployeeBenefitsController.Request,
  ): Promise<HttpResponse> {
    try {
      if (!request.name || !request.worksDays) {
        const field = !request.name ? 'name' : 'worksDays';
        return badRequest(new MissingParamError(field));
      }

      const calculateEmployeeBenefitsResponse = await this.calculateEmployeeBenefits.execute(
        request,
      );
      if (calculateEmployeeBenefitsResponse.isFail()) {
        return badRequest(calculateEmployeeBenefitsResponse.value);
      }

      return ok(calculateEmployeeBenefitsResponse.value);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CalculateEmployeeBenefitsController {
  export type Request = {
    name: string;
    worksDays: number;
    daysAtHomeOffice?: number;
  };
}
