/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerError } from '../errors';
import { HttpResponse } from '../ports';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
