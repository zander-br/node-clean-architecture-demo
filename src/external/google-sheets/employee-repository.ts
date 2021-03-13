import {
  GoogleSpreadsheet,
  ServiceAccountCredentials,
} from 'google-spreadsheet';

import Employee from '@/entities/employee/employee';
import { EmployeeData } from '@/entities/employee/employee-data';
import { EmployeeRepository } from '@/usecases/ports/employee-repository';
import { convertCurrentMoneyInNumber } from '@/shared/utils';
import Benefit from '@/entities/employee/benefit';

export class GoogleSheetsEmployeeRepository implements EmployeeRepository {
  constructor(
    private readonly spreadSheetId: string,
    private credentials: ServiceAccountCredentials,
  ) {}

  async findByName(name: string): Promise<Employee> {
    const googleSpreadsheet = new GoogleSpreadsheet(this.spreadSheetId);
    await googleSpreadsheet.useServiceAccountAuth(this.credentials);
    await googleSpreadsheet.loadInfo();

    const worksheet = googleSpreadsheet.sheetsByIndex[0];
    const rows = await worksheet.getRows();

    const employeeRow = rows.find(row => row['NOME COMPLETO'].trim() === name);
    if (!employeeRow) {
      return null;
    }

    const employeeData: EmployeeData = {
      name: employeeRow['NOME COMPLETO'].trim(),
      contract: employeeRow.CONTRATO.trim(),
      medicalLeave: employeeRow.AFASTADO.trim().toUpperCase() === 'SIM',
      transportationVoucherDiscount:
        employeeRow['DESCONTO VALE TRANSPORTE'].trim().toUpperCase() === 'SIM',
      mealVoucherDiscount:
        employeeRow['DESCONTO VALE REFEIÇÃO'].trim().toUpperCase() === 'SIM',
    };

    const employeeOrError = Employee.create(employeeData);
    const employee = employeeOrError.value as Employee;

    if (employeeRow.BOM.trim() !== 'R$  -') {
      const benefit = Benefit.create({
        name: 'BOM',
        value: convertCurrentMoneyInNumber(employeeRow.BOM.trim()),
        type: 'Transport',
        frequency: 'Daily',
      }).value as Benefit;

      employee.addBenefit(benefit);
    }

    if (employeeRow['BILHETE ÚNICO'].trim() !== 'R$  -') {
      const benefit = Benefit.create({
        name: 'BILHETE ÚNICO',
        value: convertCurrentMoneyInNumber(employeeRow['BILHETE ÚNICO'].trim()),
        type: 'Transport',
        frequency: 'Daily',
      }).value as Benefit;

      employee.addBenefit(benefit);
    }

    return employee;
  }
}
