import { InvalidNameError } from '../../../src/entities/employee/errors/invalid-name';
import { InvalidContractError } from '../../../src/entities/employee/errors/invalid-contract';
import {
  BenefitsEmptyError,
  DuplicateBenefitError,
  UniqueBenefitError,
} from '../../../src/entities/employee/errors/invalid-employee';
import Employee from '../../../src/entities/employee/employee';
import { fail } from '../../../src/shared/either';
import BenefitBuilder from '../builders/benefit-builder';
import EmployeeBuilder from '../builders/employee-builder';
import Benefit from '../../../src/entities/employee/benefit';

describe('Employee domain entity', () => {
  test('should not create employee with invalid name', () => {
    const employeeWithInvalidName = EmployeeBuilder.aEmployee()
      .withInvalidName()
      .build();

    const employeeOrError = Employee.create(employeeWithInvalidName);
    expect(employeeOrError.isSuccess()).toBe(false);
    expect(employeeOrError).toEqual(
      fail(new InvalidNameError(employeeWithInvalidName.name)),
    );
  });

  test('should not create employee with invalid contract', () => {
    const employeeWithInvalidContract = EmployeeBuilder.aEmployee()
      .withInvalidContract()
      .build();

    const employeeOrError = Employee.create(employeeWithInvalidContract);
    expect(employeeOrError.isSuccess()).toBe(false);
    expect(employeeOrError).toEqual(
      fail(new InvalidContractError(employeeWithInvalidContract.contract)),
    );
  });

  test('should create employee without medical leave when not informed', () => {
    const employeeWithoutMedicalLeave = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeWithoutMedicalLeave);
    const employee = employeeOrError.value as Employee;
    expect(employee.medicalLeave).toBe(false);
  });

  test('should create employee with medical leave when informed', () => {
    const employeeWithMedicalLeave = EmployeeBuilder.aEmployee()
      .withMedicalLeave()
      .build();
    const employeeOrError = Employee.create(employeeWithMedicalLeave);
    const employee = employeeOrError.value as Employee;
    expect(employee.medicalLeave).toBe(true);
  });

  test('should create employee with transportation voucher discount when not informed', () => {
    const employeeWithTransportationVoucherDiscount = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(
      employeeWithTransportationVoucherDiscount,
    );
    const employee = employeeOrError.value as Employee;
    expect(employee.transportationVoucherDiscount).toBe(true);
  });

  test('should create employee without transportation voucher discount when informed', () => {
    const employeeWithoutTransportationVoucherDiscount = EmployeeBuilder.aEmployee()
      .withoutTransportationVoucherDiscount()
      .build();
    const employeeOrError = Employee.create(
      employeeWithoutTransportationVoucherDiscount,
    );
    const employee = employeeOrError.value as Employee;
    expect(employee.transportationVoucherDiscount).toBe(false);
  });

  test('should create employee with meal voucher discount when not informed', () => {
    const employeeWithMealVoucherDiscount = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeWithMealVoucherDiscount);
    const employee = employeeOrError.value as Employee;
    expect(employee.mealVoucherDiscount).toBe(true);
  });

  test('should create employee without meal voucher discount when informed', () => {
    const employeeWithoutMealVoucherDiscount = EmployeeBuilder.aEmployee()
      .withoutMealVoucherDiscount()
      .build();
    const employeeOrError = Employee.create(employeeWithoutMealVoucherDiscount);
    const employee = employeeOrError.value as Employee;
    expect(employee.mealVoucherDiscount).toBe(false);
  });

  test('should create employee with benefits empty', () => {
    const employeeData = EmployeeBuilder.aEmployee().build();
    const employeeOrError = Employee.create(employeeData);
    const employee = employeeOrError.value as Employee;
    expect(employee.benefits).toHaveLength(0);
  });

  test('should not be able to add a duplicate benefit', () => {
    const employee = EmployeeBuilder.aEmployee().buildClassWithOneBenefit();
    const benefit = BenefitBuilder.aBenefit().buildClass();

    const addBenefitOrError = employee.addBenefit(benefit);
    expect(addBenefitOrError.isSuccess()).toBe(false);
    expect(addBenefitOrError).toEqual(fail(new DuplicateBenefitError(benefit)));
    expect(employee.benefits).toHaveLength(1);
  });

  test('should not be able to add a unique benefit if you already have one of the same type', () => {
    const employee = EmployeeBuilder.aEmployee().buildClassWithUniqueBenefit();
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
    const employee = EmployeeBuilder.aEmployee().buildClassWithOneBenefit();
    const benefit = BenefitBuilder.aBenefit().withAnotherName().buildClass();
    const addBenefitOrError = employee.addBenefit(benefit);

    expect(addBenefitOrError.isFail()).toBe(false);
    expect(addBenefitOrError.isSuccess()).toBe(true);
    expect(employee.benefits).toHaveLength(2);
  });

  test('should return BenefitsEmptyError if list of benefits is empty', () => {
    const employeeEmptyBenefits = EmployeeBuilder.aEmployee().buildClass();
    const benefitsOrError = employeeEmptyBenefits.calculateBenefits({
      worksDays: 10,
      daysAtHomeOffice: 10,
    });

    expect(benefitsOrError.isFail()).toBe(true);
    expect(benefitsOrError).toEqual(fail(new BenefitsEmptyError()));
  });

  test('should only return snack benefit for employees on medical leave', () => {
    const snackBenefit = BenefitBuilder.aBenefit().withSnackType().buildClass();
    const employeeOnMedicalLeave = EmployeeBuilder.aEmployee()
      .withMedicalLeave()
      .buildClassWithOneBenefit();
    employeeOnMedicalLeave.addBenefit(snackBenefit);
    const benefitsOrError = employeeOnMedicalLeave.calculateBenefits({
      worksDays: 0,
    });
    const benefits = benefitsOrError.value as Benefit[];

    expect(benefitsOrError.isSuccess()).toBe(true);
    expect(benefits).toHaveLength(1);
    expect(benefits).toEqual([snackBenefit]);
  });

  test('should be able calculate benefits by spending the working days', () => {
    const snackBenefit = BenefitBuilder.aBenefit().withSnackType().buildClass();
    const employee = EmployeeBuilder.aEmployee().buildClassWithOneBenefit();
    employee.addBenefit(snackBenefit);
    const benefitsOrError = employee.calculateBenefits({
      worksDays: 10,
    });
    const benefits = benefitsOrError.value as Benefit[];
    const benefitDaily = benefits.find(
      benefit => benefit.frequency === 'Daily',
    );
    const benefitMonthly = benefits.find(
      benefit => benefit.frequency === 'Monthly',
    );

    expect(benefitsOrError.isSuccess()).toBe(true);
    expect(benefits).toHaveLength(2);
    expect(benefitDaily.value).toEqual(220);
    expect(benefitMonthly.value).toEqual(150);
  });

  test('should consider days in home office for employees who do not have a mealVoucherDiscount', () => {
    const employee = EmployeeBuilder.aEmployee()
      .withoutMealVoucherDiscount()
      .buildClassWithOneBenefit();
    const benefitsOrError = employee.calculateBenefits({
      worksDays: 10,
      daysAtHomeOffice: 10,
    });
    const benefits = benefitsOrError.value as Benefit[];

    expect(benefitsOrError.isSuccess()).toBe(true);
    expect(benefits).toHaveLength(1);
    expect(benefits[0].value).toEqual(440);
  });
});
