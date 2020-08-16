import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpencePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";

export const history = createHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact />
      <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
      <PrivateRoute path="/add_expense" component={AddExpensePage} />
      <PrivateRoute path="/edit/:id" component={EditExpensePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
export default Routes;
