import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpencePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={ExpenseDashboardPage} exact />
      <Route path="/add_expense" component={AddExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/edit/:id" component={EditExpensePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
