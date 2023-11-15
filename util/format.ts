let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatUSDollar(amount: number) {
   const base = `${USDollar.format(Math.abs(amount))}`;
   if (amount < 0) {
     return `-${base}`;
   }
   return base;
}