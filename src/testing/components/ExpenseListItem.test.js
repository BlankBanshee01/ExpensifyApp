import React from "react";
import { shallow } from "enzyme";
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("should render expense list item", () => {
  const render = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(render).toMatchSnapshot();
});
