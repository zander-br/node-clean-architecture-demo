import { convertCurrentMoneyInNumber } from '@/shared/utils';

describe('Shared Utils', () => {
  test('should return zero if current money referes to zero', () => {
    const result = convertCurrentMoneyInNumber('R$  -');
    expect(result).toBe(0);
  });

  test('should return numeric value referring to past value changing separators', () => {
    const result = convertCurrentMoneyInNumber('R$ 1.234,56');
    expect(result).toBe(1234.56);
  });
});
