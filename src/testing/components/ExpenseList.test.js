import React from "react";
import { ExpenseList } from "../../components/ExpenseList";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";

test("should render expense list with the 3 expenses from fixtures", () => {
  const render = shallow(<ExpenseList expenses={expenses} />);
  expect(render).toMatchSnapshot();
});

test("should render expense list with no expenses", () => {
  const render = shallow(<ExpenseList expenses={[]} />);
  expect(render).toMatchSnapshot();
});
