import React from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import Routes from "./routers/router";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";

const store = configureStore();

store.dispatch(
  addExpense({ description: "expense 1", createdAt: 999, amount: 10 })
);
store.dispatch(
  addExpense({ description: "expense 2", createdAt: 100, amount: 88 })
);
store.dispatch(addExpense({ description: "from react number 2" }));
// const state = store.getState();

const jsx = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

reactDom.render(jsx, document.getElementById("root"));
