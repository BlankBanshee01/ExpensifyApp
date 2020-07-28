export default (expenses) => {
  const total = expenses
    .map((expense) => expense.amount)
    .reduce((acc, curr) => acc + curr, 0);
  return total;
};
