import React from "react";
import { shallow } from "enzyme";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test("should render Expense Dashboard page", () => {
  const render = shallow(<ExpenseDashboardPage />);
  expect(render).toMatchSnapshot();
});
