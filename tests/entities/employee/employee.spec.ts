import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
import { InvalidContractError } from '../../../src/entities/employee/errors/invalid-contract';
import {
  DuplicateBenefitError,
  UniqueBenefitError,
} from '../../../src/entities/employee/errors/invalid-employee';
import Employee from '../../../src/entities/employee/employee';
import { fail } from '../../../src/shared/either';
import EmployeeDataBuilder from '../builders/employee-data-builder';
import BenefitBuilder from '../builders/benefit-builder';
import EmployeeBuilder from '../builders/employee-builder';

describe('Employee domain entity', () => {
  test('should not create employee with invalid name', () => {
    const employeeWithInvalidName = EmployeeDataBuilder.aEmployee()
      .withInvalidName()
      .build();

    const employeeOrError = Employee.create(employeeWithInvalidName);
    expect(employeeOrError.isSuccess()).toBe(false);
    expect(employeeOrError).toEqual(
      fail(new InvalidNameError(employeeWithInvalidName.name)),
    );
  });

  test('should not create employee with invalid contract', () => {
    const employeeWithInvalidContract = EmployeeDataBuilder.aEmployee()
      .withInvalidContract()
      .build();

    const employeeOrError = Employee.create(employeeWithInvalidContract);
    expect(employeeOrError.isSuccess()).toBe(false);
    expect(employeeOrError).toEqual(
      fail(new InvalidContractError(employeeWithInvalidContract.contract)),
    );
  });

  test('should create employee without medical leave when not informed', () => {
    const employeeWithoutMedicalLeave = EmployeeDataBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeWithoutMedicalLeave);
    const employee = employeeOrError.value as Employee;
    expect(employee.medicalLeave).toBe(false);
  });

  test('should create employee with medical leave when informed', () => {
    const employeeWithMedicalLeave = EmployeeDataBuilder.aEmployee()
      .withMedicalLeave()
      .build();
    const employeeOrError = Employee.create(employeeWithMedicalLeave);
    const employee = employeeOrError.value as Employee;
    expect(employee.medicalLeave).toBe(true);
  });

  test('should create employee with transportation voucher discount when not informed', () => {
    const employeeWithTransportationVoucherDiscount = EmployeeDataBuilder.aEmployee().build();
    const employeeOrError = Employee.create(
      employeeWithTransportationVoucherDiscount,
    );
    const employee = employeeOrError.value as Employee;
    expect(employee.transportationVoucherDiscount).toBe(true);
  });

  test('should create employee without transportation voucher discount when informed', () => {
    const employeeWithoutTransportationVoucherDiscount = EmployeeDataBuilder.aEmployee()
      .withoutTransportationVoucherDiscount()
      .build();
    const employeeOrError = Employee.create(
      employeeWithoutTransportationVoucherDiscount,
    );
    const employee = employeeOrError.value as Employee;
    expect(employee.transportationVoucherDiscount).toBe(false);
  });

  test('should create employee with meal voucher discount when not informed', () => {
    const employeeWithMealVoucherDiscount = EmployeeDataBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeWithMealVoucherDiscount);
    const employee = employeeOrError.value as Employee;
    expect(employee.mealVoucherDiscount).toBe(true);
  });

  test('should create employee without meal voucher discount when informed', () => {
    const employeeWithoutMealVoucherDiscount = EmployeeDataBuilder.aEmployee()
      .withoutMealVoucherDiscount()
      .build();
    const employeeOrError = Employee.create(employeeWithoutMealVoucherDiscount);
    const employee = employeeOrError.value as Employee;
    expect(employee.mealVoucherDiscount).toBe(false);
  });

  test('should create employee with benefits empty', () => {
    const employeeData = EmployeeDataBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeData);
    const employee = employeeOrError.value as Employee;
    expect(employee.benefits).toHaveLength(0);
  });

  test('should not be able to add a duplicate benefit', () => {
    const employee = EmployeeBuilder.aEmployee().withOneBenefit().build();
    const benefit = BenefitBuilder.aBenefit().buildClass();

    const addBenefitOrError = employee.addBenefit(benefit);
    expect(addBenefitOrError.isSuccess()).toBe(false);
    expect(addBenefitOrError).toEqual(fail(new DuplicateBenefitError(benefit)));
    expect(employee.benefits).toHaveLength(1);
  });

  test('should not be able to add a unique benefit if you already have one of the same type', () => {
    const employee = EmployeeBuilder.aEmployee().withUniqueBenefit().build();
    const benefit = BenefitBuilder.aBenefit()
      .withAnotherName()
      .withMonthlyFrequency()
      .buildClass();
    const addBenefitOrError = employee.addBenefit(benefit);

    expect(addBenefitOrError.isSuccess()).toBe(false);
    expect(addBenefitOrError).toEqual(fail(new UniqueBenefitError(benefit)));
    expect(employee.benefits).toHaveLength(1);
  });

  test('should be able to add a benefit when not exists', () => {
    const employee = EmployeeBuilder.aEmployee().withOneBenefit().build();
    const benefit = BenefitBuilder.aBenefit().withAnotherName().buildClass();
    const addBenefitOrError = employee.addBenefit(benefit);

    expect(addBenefitOrError.isFail()).toBe(false);
    expect(addBenefitOrError.isSuccess()).toBe(true);
    expect(employee.benefits).toHaveLength(2);
  });
});
