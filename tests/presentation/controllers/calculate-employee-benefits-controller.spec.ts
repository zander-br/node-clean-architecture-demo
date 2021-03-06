import { CalculateEmployeeBenefitsController } from '@/presentation/controllers/calculate-employee-benefits-controller';
import { ICalculateEmployeeBenefits } from '@/usecases/calculate-employee-benefits';
import { badRequest, ok, serverError } from '@/presentation/helpers';
import { CalculateBenefitsData } from '@/usecases/calculate-employee-benefits/calculate-benefits-data';
import { fail } from '@/shared/either';
import { NotFoundEmployeeError } from '@/usecases/errors/calculate-employee-benefits';
import BenefitBuilder from '@/tests/entities/builders/benefit-builder';
import { MissingParamError } from '@/presentation/errors';
import { CalculateEmployeeBenefitsMock } from '../mocks/mock-calculate-employee-benefits';

type SutTypes = {
  sut: CalculateEmployeeBenefitsController;
  calculateEmployeeBenefitsMock: ICalculateEmployeeBenefits;
};

const makeSut = (): SutTypes => {
  const calculateEmployeeBenefitsMock = new CalculateEmployeeBenefitsMock();
  const sut = new CalculateEmployeeBenefitsController(
    calculateEmployeeBenefitsMock,
  );

  return {
    sut,
    calculateEmployeeBenefitsMock,
  };
};

const mockRequest = (): CalculateEmployeeBenefitsController.Request => ({
  name: 'Anderson Santos',
  worksDays: 10,
});

describe('CalculateEmployeeBenefits Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ name: null, worksDays: 10 });

    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')));
  });

  test('should return 400 if no worksDays is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      name: 'Anderson',
      worksDays: null,
    });

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('worksDays')),
    );
  });

  test('should call CalculateEmployeeBenefits with correct values', async () => {
    const { sut, calculateEmployeeBenefitsMock } = makeSut();
    const calculateEmployeeBenefitsSpy = jest.spyOn(
      calculateEmployeeBenefitsMock,
      'execute',
    );
    const request = mockRequest();
    await sut.handle(request);
    expect(calculateEmployeeBenefitsSpy).toHaveBeenCalledWith(request);
  });

  test('should return 400 if CalculateEmployeeBenefits return fail', async () => {
    const { sut, calculateEmployeeBenefitsMock } = makeSut();
    jest
      .spyOn(calculateEmployeeBenefitsMock, 'execute')
      .mockImplementationOnce(async ({ name }: CalculateBenefitsData) => {
        return Promise.resolve(fail(new NotFoundEmployeeError(name)));
      });
    const request = mockRequest();
    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      badRequest(new NotFoundEmployeeError(request.name)),
    );
  });

  test('should return 500 if CalculateEmployeeBenefits throws', async () => {
    const { sut, calculateEmployeeBenefitsMock } = makeSut();
    jest
      .spyOn(calculateEmployeeBenefitsMock, 'execute')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const benefit = BenefitBuilder.aBenefit().buildClass();
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok([benefit]));
  });
});
