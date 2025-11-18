let monthlySavings = (allPayments = [], livingCost = 0) => {
  if (!Array.isArray(allPayments) || !Number.isFinite(livingCost)) return 'invalid input';

  let totalEarnings = 0,
    tax = 0;
  for (let i = 0; i < allPayments.length; i++) {
    if (allPayments[i] >= 3000) tax += allPayments[i] - allPayments[i] * 0.8;

    totalEarnings += allPayments[i];
  }

  let remain = totalEarnings - livingCost - tax;

  if (remain < 0) return 'earn more';
  else return remain;
};

console.log(monthlySavings([1000, 2000, 3000], 5400));
console.log(monthlySavings([1000, 2000, 2500], 5000));
console.log(monthlySavings([900, 2700, 3400], 10000));
console.log(monthlySavings(100, [900, 2700, 3400]));
