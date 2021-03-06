import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from "../../actions/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import expenses from "../fixtures/expenses";
import { create } from "react-test-renderer";

const createMockStore = configureMockStore([thunk]);
const uid = "testUID";
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
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
  const store = createMockStore(defaultAuthState);
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
      return database
        .ref(`users/${uid}/expenses/${action[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense to database and store with default values", (done) => {
  const store = createMockStore(defaultAuthState);
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
      .ref(`users/${uid}/expenses/${action[0].expense.id}`)
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

test("should dispatch start set expenses", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE",
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should dispatch and edit expense in database", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const changes = {
    description: "changes description",
  };
  store
    .dispatch(startEditExpense(id, changes))
    .then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        changes,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val().description).toBe(changes.description);
      done();
    });
});
