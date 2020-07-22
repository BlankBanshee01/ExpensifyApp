import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink activeClassName="active-link" exact to="/">
      Home
    </NavLink>
    <NavLink activeClassName="active-link" to="/add_expense">
      Create Expence
    </NavLink>
  </header>
);

export default Header;
