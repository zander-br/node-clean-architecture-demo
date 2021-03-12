/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Validation {
  validate: (input: any) => Error;
}
