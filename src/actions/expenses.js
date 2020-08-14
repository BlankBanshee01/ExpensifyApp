import databse from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = (expense) => {
  return {
    type: "ADD_EXPENSE",
    expense,
  };
};

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    return databse
      .ref("expenses")
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

// EDIT_EXPENSE
export const editExpense = (id, changes) => ({
  type: "EDIT_EXPENSE",
  id,
  changes,
});

//SET_EXPENSES

export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

// START_SET_EXPENSE

export const startSetExpenses = () => {
  return (dispatch) => {
    const expenses = [];
    return databse
      .ref("expenses")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
