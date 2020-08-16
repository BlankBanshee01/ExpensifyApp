import React from "react";
import { LoginPage } from "../../components/LoginPage";
import { shallow } from "enzyme";

test("should render login page correctly", () => {
  const wrapper = shallow(<LoginPage startLogin={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test("shoulf call Login on button click", () => {
  const startLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);
  wrapper.find("button").simulate("click");
  expect(startLoginSpy).toHaveBeenCalled();
});
