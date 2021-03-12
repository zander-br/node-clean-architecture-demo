/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Validation } from '@/presentation/ports';

export class ValidationMock implements Validation {
  error: Error = null;

  input: any;

  validate(input: any): Error {
    this.input = input;
    return this.error;
  }
}
