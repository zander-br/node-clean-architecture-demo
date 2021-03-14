import { Router } from 'express';

import { makeCalculateEmployeeBenefitsController } from '../factories/calculate-benefits';
import { adaptRoute } from '../adapters/express-route-adapter';

export default (route: Router): void => {
  route.post(
    '/calculate-benefits',
    adaptRoute(makeCalculateEmployeeBenefitsController()),
  );
};
