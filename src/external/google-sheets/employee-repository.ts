import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  ServiceAccountCredentials,
} from 'google-spreadsheet';

import Employee from '@/entities/employee/employee';
import { EmployeeData } from '@/entities/employee/employee-data';
import { EmployeeRepository } from '@/usecases/ports/employee-repository';
import { convertCurrentMoneyInNumber } from '@/shared/utils';
import Benefit from '@/entities/employee/benefit';

const TRANSPORTATION_BENEFITS = [
  'BOM',
  'BILHETE ÚNICO',
  'BEN FÁCIL',
  'BEM OSASCO',
  'SIM MAUÁ',
];

export class GoogleSheetsEmployeeRepository implements EmployeeRepository {
  private rows: GoogleSpreadsheetRow[];

  constructor(
    private readonly spreadSheetId: string,
    private credentials: ServiceAccountCredentials,
  ) {}

  async findByName(name: string): Promise<Employee> {
    if (!this.rows) {
      await this.loadRows();
    }

    const employeeRow = this.rows.find(
      row => row['NOME COMPLETO'].trim() === name,
    );

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

    TRANSPORTATION_BENEFITS.forEach(nameBenefit => {
      if (this.hasValue(employeeRow[nameBenefit])) {
        employee.addBenefit(
          this.createTransportBenefit(employeeRow, nameBenefit),
        );
      }
    });

    if (this.hasValue(employeeRow['VR AUTO'])) {
      const benefit = Benefit.create({
        name: 'VR AUTO',
        value: convertCurrentMoneyInNumber(employeeRow['VR AUTO'].trim()),
        type: 'Fuel',
        frequency: 'Monthly',
      }).value as Benefit;

      employee.addBenefit(benefit);
    }

    if (this.hasValue(employeeRow['VALE ALIMENTAÇÃO'])) {
      const benefit = Benefit.create({
        name: 'VALE ALIMENTAÇÃO',
        value: convertCurrentMoneyInNumber(
          employeeRow['VALE ALIMENTAÇÃO'].trim(),
        ),
        type: 'Snack',
        frequency: 'Monthly',
      }).value as Benefit;

      employee.addBenefit(benefit);
    }

    if (this.hasValue(employeeRow['VALE REFEIÇÃO'])) {
      const benefit = Benefit.create({
        name: 'VALE REFEIÇÃO',
        value: convertCurrentMoneyInNumber(employeeRow['VALE REFEIÇÃO'].trim()),
        type: 'Food',
        frequency: 'Daily',
      }).value as Benefit;

      employee.addBenefit(benefit);
    }

    return employee;
  }

  private async loadRows() {
    const googleSpreadsheet = new GoogleSpreadsheet(this.spreadSheetId);
    await googleSpreadsheet.useServiceAccountAuth(this.credentials);
    await googleSpreadsheet.loadInfo();

    const worksheet = googleSpreadsheet.sheetsByIndex[0];
    this.rows = await worksheet.getRows();
  }

  private createTransportBenefit(row: GoogleSpreadsheetRow, name: string) {
    const value = convertCurrentMoneyInNumber(row[name].trim());

    const benefit = Benefit.create({
      name,
      value,
      type: 'Transport',
      frequency: 'Daily',
    }).value as Benefit;

    return benefit;
  }

  private hasValue(rowValue: string) {
    return rowValue.trim() !== 'R$  -' && rowValue.trim();
  }
}
