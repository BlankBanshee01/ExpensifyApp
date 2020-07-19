import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div>
    <h1>Expensify</h1>
    <NavLink activeClassName="active-link" exact to="/">
      Home
    </NavLink>
    <NavLink activeClassName="active-link" to="/add_expense">
      Create Expence
    </NavLink>
    <NavLink activeClassName="active-link" to="/help">
      Help
    </NavLink>
  </div>
);

export default Header;
