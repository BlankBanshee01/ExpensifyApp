import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenseTotal from "../selectors/selectExpenseTotal";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = (props) => {
  const expenseWord = props.visibleExpenseNumber === 1 ? "expense" : "expenses";
  return (
    <div>
      <h3>
        Showing a total of {props.visibleExpenseNumber} {expenseWord} totaling{" "}
        {numeral(props.totalAmount / 100).format("$0,0.00")}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    visibleExpenseNumber: visibleExpenses.length,
    totalAmount: selectExpenseTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
