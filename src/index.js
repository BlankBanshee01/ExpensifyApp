import React from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import Routes from "./routers/router";
import configureStore from "./store/configureStore";
import "react-dates/lib/css/_datepicker.css";
import "./firebase/firebase";
const store = configureStore();

// const state = store.getState();

const jsx = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

reactDom.render(jsx, document.getElementById("root"));
