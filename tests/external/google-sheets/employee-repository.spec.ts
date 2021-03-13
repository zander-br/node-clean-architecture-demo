import { GoogleSheetsEmployeeRepository } from '@/external/google-sheets/employee-repository';

require('dotenv-flow').config();

const makeSut = (): GoogleSheetsEmployeeRepository => {
  const spreadSheetId = process.env.SPREAD_SHEET_ID;
  const credentials = {
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  return new GoogleSheetsEmployeeRepository(spreadSheetId, credentials);
};

describe('GoogleSheetsEmployee Repository', () => {
  test('should return an employee on success', async () => {
    const sut = makeSut();
    const name = 'VALID EMPLOYEE';
    const employee = await sut.findByName(name);

    expect(employee).toBeTruthy();
    expect(employee.name.value).toBe(name);
  });

  test('should return null if findByName fails', async () => {
    const sut = makeSut();
    const name = 'INVALID EMPLOYEE';
    const employee = await sut.findByName(name);

    expect(employee).toBeFalsy();
  });

  test('should return an employee with BOM benefit when value greater than zero', async () => {
    const sut = makeSut();
    const employee = await sut.findByName('EMPLOYEE WITH BOM');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BOM');
  });

  test('should return an employee with BILHETE ÚNICO benefit when value greater than zero', async () => {
    const sut = makeSut();
    const employee = await sut.findByName('EMPLOYEE WITH BILHETE ÚNICO');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BILHETE ÚNICO');
  });

  test('should return an employee with BEN FÁCIL benefit when value greater than zero', async () => {
    const sut = makeSut();
    const employee = await sut.findByName('EMPLOYEE WITH BEN FÁCIL');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BEN FÁCIL');
  });
});
