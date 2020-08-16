import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = (expense) => {
  return {
    type: "ADD_EXPENSE",
    expense,
  };
};

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE",
  id,
});

// START_REMOVE_EXPENSE
export const startRemoveExpense = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .set(null)
      .then(dispatch(removeExpense({ id })));
  };
};

// EDIT_EXPENSE
export const editExpense = (id, changes) => ({
  type: "EDIT_EXPENSE",
  id,
  changes,
});

// START_EDIT_EXPENSE
export const startEditExpense = (id, changes) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(changes)
      .then(() => {
        dispatch(editExpense(id, changes));
      });
  };
};

//SET_EXPENSES

export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

// START_SET_EXPENSE

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const expenses = [];
    return database
      .ref(`users/${uid}/expenses`)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
