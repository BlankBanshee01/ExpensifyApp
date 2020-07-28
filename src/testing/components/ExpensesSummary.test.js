import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should render expense summary with 1 expense", () => {
  const wrapper = shallow(
    <ExpensesSummary visibleExpenseNumber={1} totalAmount={20} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render expense summary with multiple expense {S}", () => {
  const wrapper = shallow(
    <ExpensesSummary visibleExpenseNumber={3} totalAmount={20} />
  );
  expect(wrapper).toMatchSnapshot();
});
