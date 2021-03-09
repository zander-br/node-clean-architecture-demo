import { BenefitsEmptyError } from '@/entities/employee/errors/invalid-employee';
import CalculateEmployeeBenefits from '@/usecases/calculate-employee-benefits/calculate-employee-benefits';
import { NotFoundEmployeeError } from '@/usecases/errors/calculate-employee-benefits';
import { EmployeeRepository } from '@/usecases/ports/employee-repository';
import { CalculateBenefitsData } from '@/usecases/calculate-employee-benefits/calculate-benefits-data';
import EmployeeDataBuilder from '../entities/builders/employee-builder';
import InMemoryEmployeeRepository from './ports/in-memory-employee-repository';

type SutTypes = {
  sut: CalculateEmployeeBenefits;
  employeeRepositorySpy: EmployeeRepository;
};

const makeSut = (): SutTypes => {
  const employeeRepositorySpy = new InMemoryEmployeeRepository();
  const sut = new CalculateEmployeeBenefits(employeeRepositorySpy);
  return { sut, employeeRepositorySpy };
};

const makeFakeCalculateData = (): CalculateBenefitsData => ({
  name: 'Anderson Santos',
  worksDays: 10,
});

describe('Calculate employee benefits use case', () => {
  test('should not calculate benefit when the employee is not found', async () => {
    const { sut } = makeSut();
    const calculateData = {
      ...makeFakeCalculateData(),
      name: 'not-found-employee',
    };
    const error = await sut.execute(calculateData);
    expect(error.value).toEqual(new NotFoundEmployeeError(calculateData.name));
    expect(error.isFail()).toBeTruthy();
  });

  test('should call findByName with correct value', async () => {
    const { sut, employeeRepositorySpy } = makeSut();
    const calculateData = makeFakeCalculateData();
    const findByNameSpy = jest.spyOn(employeeRepositorySpy, 'findByName');
    await sut.execute(calculateData);

    expect(findByNameSpy).toHaveBeenCalledWith(calculateData.name);
  });

  test('should not calculate benefit when the employee benefits is empty', async () => {
    const { sut, employeeRepositorySpy } = makeSut();
    const mockWithoutBenefits = EmployeeDataBuilder.aEmployee().buildClass();
    jest
      .spyOn(employeeRepositorySpy, 'findByName')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(mockWithoutBenefits)),
      );

    const error = await sut.execute(makeFakeCalculateData());
    expect(error.value).toEqual(new BenefitsEmptyError());
    expect(error.isFail()).toBeTruthy();
  });

  test('should return calculate benefits', async () => {
    const { sut } = makeSut();
    const response = await sut.execute(makeFakeCalculateData());

    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toHaveLength(1);
    expect(response.value).toContainEqual({
      name: 'VR Refeição',
      value: 220,
      type: 'Food',
      frequency: 'Daily',
    });
  });
});
