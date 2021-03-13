export function convertCurrentMoneyInNumber(currentMoney: string): number {
  const value = currentMoney.replace('R$ ', '').trim();
  if (value === '-') {
    return 0;
  }

  return parseFloat(value.replace('.', '').replace(',', '.'));
}
