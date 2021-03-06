import React, { Component } from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class ExpenseListFilters extends Component {
  state = {
    focusedInput: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (focusedInput) => this.setState({ focusedInput });

  onTextFilterChange = (e) => this.props.setTextFilter(e.target.value);

  onSortByFilterChange = (e) => {
    if (e.target.value === "amount") {
      this.props.sortByAmount();
    } else if (e.target.value === "date") {
      this.props.sortByDate();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextFilterChange}
              placeholder="Search expences"
              className="text-input"
            ></input>
          </div>
          <div className="input-group__item">
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortByFilterChange}
              className="select"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDates={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setTextFilter: (value) => dispatch(setTextFilter(value)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate()),
});

const mapStateToProps = (state) => ({
  filters: state.filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
