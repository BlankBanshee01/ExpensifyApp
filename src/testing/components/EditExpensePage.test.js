import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpencePage";
import expenses from "../fixtures/expenses";

let expense, history, startRemoveExpense, editExpense, wrapper;

beforeEach(() => {
  expense = expenses[1];
  history = { push: jest.fn() };
  startRemoveExpense = jest.fn();
  editExpense = jest.fn();
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      history={history}
      startRemoveExpense={startRemoveExpense}
      editExpense={editExpense}
    />
  );
});

test("should render edit expense page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle edit expense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle remove expense", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
  expect(history.push).toHaveBeenLastCalledWith("/");
});
