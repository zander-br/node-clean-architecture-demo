export class InvalidContractError extends Error implements DomainError {
  constructor(contract: string) {
    super(`The contract "${contract}" is invalid.`);
    this.name = 'InvalidContractError';
  }
}
