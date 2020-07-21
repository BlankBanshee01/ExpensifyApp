import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../../actions/filters";
import moment from "moment";

test("set start date test", () => {
  const result = setStartDate(moment(0));
  expect(result).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});

test("set end date test", () => {
  const result = setEndDate(moment(0));
  expect(result).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});

test("sort  by date action generator", () => {
  expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
});

test("sort  by Amount action generator", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});

test("set text filter action generator", () => {
  const result = setTextFilter("filtros");
  expect(result).toEqual({ type: "SET_TEXT_FILTER", text: "filtros" });
});

test("set text filter action generator with default", () => {
  const result = setTextFilter();
  expect(result).toEqual({ type: "SET_TEXT_FILTER", text: "" });
});
