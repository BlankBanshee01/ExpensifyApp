import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { Link } from "react-router-dom";
import selectExpenseTotal from "../selectors/selectExpenseTotal";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = (props) => {
  const expenseWord = props.visibleExpenseNumber === 1 ? "expense" : "expenses";
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Showing a total of <span>{props.visibleExpenseNumber}</span>{" "}
          {expenseWord} totaling{" "}
          <span>{numeral(props.totalAmount / 100).format("$0,0.00")}</span>
        </h1>
        <div className="page-header__actions">
          <Link to="/add_expense" className="button">
            Add Expense
          </Link>
        </div>
      </div>
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
