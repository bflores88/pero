import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";

import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";
import Budget from "./containers/Budget";
import Settings from "./containers/Settings";
import Register from "./containers/Register";
import BudgetDetail from "./containers/BudgetDetail";
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/budgets/:id" component={BudgetDetail} />
        <Route path="/create" component={Budget} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Dashboard} />
      </Switch>
    );
    return <div className="App">{routes}</div>;
  }
}

export default App;
