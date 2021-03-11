/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from './htpp';

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
