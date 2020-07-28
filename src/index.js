import React from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import Routes from "./routers/router";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

// const state = store.getState();

const jsx = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

reactDom.render(jsx, document.getElementById("root"));
