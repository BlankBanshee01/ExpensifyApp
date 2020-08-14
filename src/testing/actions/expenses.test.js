import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
} from "../../actions/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt };
  });
  database
    .ref("expenses")
    .set(expenseData)
    .then(() => done());
});

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
    expense: data,
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "something",
    note: "hello",
    amount: 9000,
    createdAt: 1000,
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return database.ref(`expenses/${action[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense to database and store with default values", (done) => {
  const store = createMockStore({});
  const expense = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };
  store.dispatch(startAddExpense()).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expense,
      },
    });
    database
      .ref(`expenses/${action[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
      });
  });
});

test("should setup set expenses action object ", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should dispatch start set expenses", () => {
  const store = createMockStore();
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "START_SET_EXPENSES",
      expenses,
    });
  });
});
