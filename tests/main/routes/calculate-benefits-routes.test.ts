import request from 'supertest';

import app from '@/main/config/app';

describe('Register Routes', () => {
  test('should return benefits list on success', async () => {
    await request(app)
      .post('/api/calculate-benefits')
      .send({
        name: 'VALID EMPLOYEE',
        worksDays: 10,
      })
      .expect(200);
  });
});
