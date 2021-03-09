import Benefit from '@/entities/employee/benefit';
import { BenefitsEmptyError } from '@/entities/employee/errors/invalid-employee';
import { Either } from '@/shared/either';
import { NotFoundEmployeeError } from '../errors/calculate-employee-benefits';

export type CalculateEmployeeBenefitsResponse = Either<
  NotFoundEmployeeError | BenefitsEmptyError,
  Benefit[]
>;
