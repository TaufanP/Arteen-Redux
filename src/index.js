import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/login";
import LoginWarn from "./components/loginWarn";
import History from "./components/history";
import Registration from "./components/registration";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const AppWithRouter = () => (
  <Router>
    <Route exact path="/" component={Login} />
    <Route path="/product" exact component={App} />
    <Route path="/loginwarn" component={LoginWarn} />
    <Route path="/history" component={History} />
    <Route path="/regist" component={Registration} />
  </Router>
)

const AppWithRedux = () => (
  <Provider store={store}>
    <AppWithRouter />
  </Provider>
)

ReactDOM.render(<AppWithRedux />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
