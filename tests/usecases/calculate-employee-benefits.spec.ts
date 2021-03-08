import CalculateEmployeeBenefits from '@/usecases/calculate-employee-benefits/calculate-employee-benefits';
import { NotFoundEmployeeError } from '@/usecases/errors/calculate-employee-benefits';
import InMemoryEmployeeRepository from './ports/in-memory-employee-repository';

describe('Calculate employee benefits use case', () => {
  test('should not calculate benefit when the employee is not found', async () => {
    const calculateData = { name: 'not-found-employee', worksDays: 10 };
    const employeeRepository = new InMemoryEmployeeRepository();
    const sut = new CalculateEmployeeBenefits(employeeRepository);
    const error = await sut.execute(calculateData);
    expect(error.value).toEqual(new NotFoundEmployeeError(calculateData.name));
    expect(error.isFail()).toBeTruthy();
  });
});
