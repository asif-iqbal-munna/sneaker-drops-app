export const currencyFormatter = (amount: string | number) => {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(Number(amount));
}