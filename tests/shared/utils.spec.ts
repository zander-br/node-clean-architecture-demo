import { convertCurrentMoneyInNumber } from '@/shared/utils';

describe('Shared Utils', () => {
  test('should return zero if current money referes to zero', async () => {
    const result = convertCurrentMoneyInNumber('R$  -');
    expect(result).toBe(0);
  });
});
