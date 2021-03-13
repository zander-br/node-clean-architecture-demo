import { GoogleSheetsEmployeeRepository } from '@/external/google-sheets/employee-repository';

require('dotenv-flow').config();

describe('GoogleSheetsEmployee Repository', () => {
  test('should return an employee on success', async () => {
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
    const name = 'VALID EMPLOYEE';
    const employee = await employeeRepository.findByName(name);

    expect(employee).toBeTruthy();
    expect(employee.name.value).toBe(name);
  });
});
