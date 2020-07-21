import { v4 as uuid } from "uuid";

// ADD_EXPENSE
export const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt,
    },
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
