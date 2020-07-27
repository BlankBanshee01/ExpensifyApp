import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filter, filterTwo } from "../fixtures/filters";
import moment from "moment";

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      filters={filter}
    />
  );
});

test("should render Expense list filter correctly", () =>
  expect(wrapper).toMatchSnapshot());

test("should call set text filter with the right args", () => {
  const e = { target: { value: "inputa" } };
  wrapper.find("input").at(0).simulate("change", e);
  expect(setTextFilter).toHaveBeenLastCalledWith(e.target.value);
});

test("should call sort By Amount or Date with the right args", () => {
  const e = { target: { value: "amount" } };
  const e2 = { target: { value: "date" } };
  wrapper.find("select").simulate("change", e);
  expect(sortByAmount).toHaveBeenCalled();
  wrapper.find("select").simulate("change", e2);
  expect(sortByDate).toHaveBeenCalled();
});

test("should handle set focus change", () => {
  const focusedInput = null;
  wrapper.find("DateRangePicker").prop("onFocusChange")(focusedInput);
  expect(wrapper.state().focusedInput).toEqual(focusedInput);
});

test("should call set Start Date and End Date with the right args", () => {
  const startDate = moment(0);
  const endDate = moment(0).add(3, "years");
  wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});
