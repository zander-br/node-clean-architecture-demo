import { GoogleSheetsEmployeeRepository } from '@/external/google-sheets/employee-repository';
import { CalculateEmployeeBenefitsController } from '@/presentation/controllers/calculate-employee-benefits-controller';
import CalculateEmployeeBenefits from '@/usecases/calculate-employee-benefits/calculate-employee-benefits';

export const makeCalculateEmployeeBenefitsController = (): CalculateEmployeeBenefitsController => {
  const spreadSheetId = process.env.SPREAD_SHEET_ID;
  const credentials = {
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
  const employeeRepository = new GoogleSheetsEmployeeRepository(
    spreadSheetId,
    credentials,
  );
  const calculateEmployeeBenefits = new CalculateEmployeeBenefits(
    employeeRepository,
  );
  const calculateEmployeeBenefitsController = new CalculateEmployeeBenefitsController(
    calculateEmployeeBenefits,
  );
  return calculateEmployeeBenefitsController;
};
