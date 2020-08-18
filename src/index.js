import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import Routes, { history } from "./routers/router";
import configureStore from "./store/configureStore";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    reactDom.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

reactDom.render(<LoadingPage />, document.getElementById("root"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
