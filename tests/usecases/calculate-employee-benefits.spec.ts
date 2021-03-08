import CalculateEmployeeBenefits from '@/usecases/calculate-employee-benefits/calculate-employee-benefits';
import { NotFoundEmployeeError } from '@/usecases/errors/calculate-employee-benefits';
import { EmployeeRepository } from '@/usecases/ports/employee-repository';

class EmployeeRepositoryMemory implements EmployeeRepository {
  async findByName(name: string) {
    return null;
  }
}

describe('Calculate employee benefits use case', () => {
  test('should not calculate benefit when the employee is not found', async () => {
    const calculateData = { name: 'Anderson Santos', worksDays: 10 };
    const employeeRepository = new EmployeeRepositoryMemory();
    const sut = new CalculateEmployeeBenefits(employeeRepository);
    const error = await sut.execute(calculateData);
    expect(error.value).toEqual(new NotFoundEmployeeError(calculateData.name));
    expect(error.isFail()).toBeTruthy();
  });
});
