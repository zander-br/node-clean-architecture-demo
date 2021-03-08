import { Either } from '@/shared/either';
import { NotFoundEmployeeError } from '../errors/calculate-employee-benefits';

export type CalculateEmployeeBenefitsResponse = Either<
  NotFoundEmployeeError,
  boolean
>;
