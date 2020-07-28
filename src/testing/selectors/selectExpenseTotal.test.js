import selectExpenseTotal from "../../selectors/selectExpenseTotal";
import expenses from "../fixtures/expenses";

test("shoudl return 0 if no expenses are given", () => {
  expect(selectExpenseTotal([])).toBe(0);
});

test("should return total expense of one expense", () => {
  expect(selectExpenseTotal([expenses[0]])).toBe(expenses[0].amount);
});

test("should return total expenses of multiple expenses", () => {
  const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;
  expect(selectExpenseTotal(expenses)).toBe(total);
});
