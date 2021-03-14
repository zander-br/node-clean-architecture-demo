import { Express } from 'express';
import { bodyParser } from '../middleware';

export default (app: Express): void => {
  app.use(bodyParser);
};
