import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

test("edit expense test", () => {
  const result = editExpense("123", { note: "hello", description: "updated" });
  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: "123",
    changes: {
      note: "hello",
      description: "updated",
    },
  });
});

test("remove expense", () => {
  const result = removeExpense({ id: "20" });
  expect(result).toEqual({
    type: "REMOVE",
    id: "20",
  });
});

test("add expense", () => {
  const data = {
    description: "something",
    note: "hello",
    amount: 9000,
    createdAt: 1000,
  };
  const result = addExpense(data);
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: { ...data, id: expect.any(String) },
  });
});

test("add expense without inputs", () => {
  const result = addExpense();
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String),
    },
  });
});
