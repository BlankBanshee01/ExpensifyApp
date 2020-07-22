import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("testing default expenses state", () => {
  const rtrn = expensesReducer(undefined, "@@INIT");
  expect(rtrn).toEqual([]);
});

test("testing add expense", () => {
  const expense = {
    id: "4",
    description: "tobeAdded",
    note: "",
    amount: 2000,
    createdAt: 1000,
  };
  const rtrn = expensesReducer(expenses, { type: "ADD_EXPENSE", expense });
  expect(rtrn).toEqual([...expenses, expense]);
});

test("testing remove expense by id", () => {
  const rtrn = expensesReducer(expenses, { type: "REMOVE", id: "2" });
  expect(rtrn).toEqual([expenses[0], expenses[2]]);
});

test("tetsing edit expense", () => {
  const changes = {
    description: "new descirption",
  };
  const toExpect = [
    {
      id: "1",
      description: "Gum",
      note: "",
      amount: 195,
      createdAt: 0,
    },
    {
      id: "2",
      description: "new descirption",
      note: "",
      amount: 109500,
      createdAt: moment(0).subtract(4, "days").valueOf(),
    },
    {
      id: "3",
      description: "Credit Card",
      note: "",
      amount: 4500,
      createdAt: moment(0).add(4, "days").valueOf(),
    },
  ];
  const rtrn = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: "2",
    changes,
  });
  expect(rtrn).toEqual(toExpect);
});
