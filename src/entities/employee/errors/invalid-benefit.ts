export class InvalidBenefitNameError extends Error implements DomainError {
  constructor(name: string) {
    super(`The benefit name "${name}" is invalid.`);
    this.name = 'InvalidBenefitNameError';
  }
}

export class InvalidBenefitValueError extends Error implements DomainError {
  constructor(value: number) {
    super(`The benefit value "${value}" is invalid.`);
    this.name = 'InvalidBenefitValueError';
  }
}
