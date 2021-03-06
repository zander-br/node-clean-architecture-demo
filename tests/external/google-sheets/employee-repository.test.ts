import 'dotenv-flow/config';
import { GoogleSheetsEmployeeRepository } from '@/external/google-sheets/employee-repository';

describe('GoogleSheetsEmployee Repository', () => {
  let sut: GoogleSheetsEmployeeRepository;

  beforeAll(() => {
    const spreadSheetId = process.env.SPREAD_SHEET_ID;
    const credentials = {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    sut = new GoogleSheetsEmployeeRepository(spreadSheetId, credentials);
  });

  test('should return an employee on success', async () => {
    const name = 'VALID EMPLOYEE';
    const employee = await sut.findByName(name);

    expect(employee).toBeTruthy();
    expect(employee.name.value).toBe(name);
  });

  test('should return null if findByName fails', async () => {
    const name = 'INVALID EMPLOYEE';
    const employee = await sut.findByName(name);

    expect(employee).toBeFalsy();
  });

  test('should return an employee with BOM benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH BOM');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BOM');
  });

  test('should return an employee with BILHETE ÚNICO benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH BILHETE ÚNICO');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BILHETE ÚNICO');
  });

  test('should return an employee with BEN FÁCIL benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH BEN FÁCIL');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BEN FÁCIL');
  });

  test('should return an employee with BEN FÁCIL benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH BEN FÁCIL');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BEN FÁCIL');
  });

  test('should return an employee with BEM OSASCO benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH BEM OSASCO');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('BEM OSASCO');
  });

  test('should return an employee with SIM MAUÁ benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH SIM MAUÁ');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('SIM MAUÁ');
  });

  test('should return an employee with VR AUTO benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH VR AUTO');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('VR AUTO');
  });

  test('should return an employee with VALE ALIMENTAÇÃO benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH VALE ALIMENTAÇÃO');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('VALE ALIMENTAÇÃO');
  });

  test('should return an employee with VALE REFEIÇÃO benefit when value greater than zero', async () => {
    const employee = await sut.findByName('EMPLOYEE WITH VALE REFEIÇÃO');

    expect(employee.hasBenefits()).toBe(true);
    expect(employee.benefits).toHaveLength(1);
    expect(employee.benefits[0].name).toEqual('VALE REFEIÇÃO');
  });
});
