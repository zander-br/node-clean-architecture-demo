import { CalculateEmployeeBenefitsController } from '@/presentation/controllers/calculate-employee-benefits-controller';
import { ICalculateEmployeeBenefits } from '@/usecases/calculate-employee-benefits';
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

describe('CalculateEmployeeBenefits Controller', () => {
  test('should call calculateEmployeeBenefits with correct values', async () => {
    const { sut, calculateEmployeeBenefitsMock } = makeSut();
    const calculateEmployeeBenefitsSpy = jest.spyOn(
      calculateEmployeeBenefitsMock,
      'execute',
    );
    const request = { name: 'Anderson Santos', worksDays: 10 };
    await sut.handle(request);
    expect(calculateEmployeeBenefitsSpy).toHaveBeenCalledWith(request);
  });
});
