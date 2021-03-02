import Benefit from '../benefit';

export class DuplicateBenefitError extends Error implements DomainError {
  constructor({ name }: Benefit) {
    super(`The benefit ${name} informed is already registered.`);
    this.name = 'DuplicateBenefitError';
  }
}

export class UniqueBenefitError extends Error implements DomainError {
  constructor({ type }: Benefit) {
    super(`The unique benefit type ${type} informed is already registered.`);
    this.name = 'UniqueBenefitError';
  }
}
