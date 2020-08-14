import React, { Component } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends Component {
  onSubmit = (updatedExpense) => {
    this.props.startEditExpense(this.props.expense.id, updatedExpense);
    this.props.history.push("/");
  };

  onClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onClick}>Remove Expense</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, updatedExpense) =>
    dispatch(startEditExpense(id, updatedExpense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
});

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(
    (expense) => expense.id === props.match.params.id
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
