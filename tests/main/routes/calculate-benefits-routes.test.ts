import 'dotenv-flow/config';
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
      .expect(200)
      .then(response => {
        expect(response.body).toHaveLength(3);
        expect(response.body).toEqual([
          {
            name: 'VALE ALIMENTAÇÃO',
            value: 100,
            type: 'Snack',
            frequency: 'Monthly',
          },
          {
            name: 'VALE REFEIÇÃO',
            value: 100,
            type: 'Food',
            frequency: 'Daily',
          },
          { name: 'BOM', value: 100, type: 'Transport', frequency: 'Daily' },
        ]);
      });
  });
});
