import { ICalculateEmployeeBenefits } from '@/usecases/calculate-employee-benefits';
import { badRequest, ok, serverError } from '../helpers';
import { Controller, HttpResponse, Validation } from '../ports';

export class CalculateEmployeeBenefitsController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly calculateEmployeeBenefits: ICalculateEmployeeBenefits,
  ) {}

  async handle(
    request: CalculateEmployeeBenefitsController.Request,
  ): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
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
