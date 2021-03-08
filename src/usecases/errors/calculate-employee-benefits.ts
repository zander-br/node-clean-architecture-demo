export class NotFoundEmployeeError extends Error implements UsecaseError {
  constructor(name: string) {
    super(`The employee "${name}" is not found.`);
    this.name = 'NotFoundEmployeeError';
  }
}
