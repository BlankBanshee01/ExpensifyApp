import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("should setup default state", () => {
  const rtrn = filtersReducer(undefined, "@@INIT");
  expect(rtrn).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should sort dort by to amount", () => {
  const rtrn = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(rtrn.sortBy).toBe("amount");
});

test("should set sort by to date", () => {
  const state = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  };
  const rtrn = filtersReducer(state, { type: "SORT_BY_DATE" });
  expect(rtrn.sortBy).toBe("date");
});

test("should set text filter", () => {
  const rtrn = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text: "yoho",
  });
  expect(rtrn.text).toBe("yoho");
});

test("should set start date filter", () => {
  const rtrn = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: moment(0),
  });
  expect(rtrn.startDate).toMatchObject(moment(0));
});

test("should set endDate filter", () => {
  const rtrn = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate: moment(1000),
  });
  expect(rtrn.endDate).toMatchObject(moment(1000));
});
