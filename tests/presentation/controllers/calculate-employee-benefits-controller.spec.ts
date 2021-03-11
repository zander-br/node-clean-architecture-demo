import { CalculateEmployeeBenefitsController } from '@/presentation/controllers/calculate-employee-benefits-controller';
import { ICalculateEmployeeBenefits } from '@/usecases/calculate-employee-benefits';
import { serverError } from '@/presentation/helpers';
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

  test('should return 500 if CalculateEmployeeBenefits throws', async () => {
    const { sut, calculateEmployeeBenefitsMock } = makeSut();
    jest
      .spyOn(calculateEmployeeBenefitsMock, 'execute')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
