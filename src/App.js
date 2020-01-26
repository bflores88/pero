import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";

import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";
import Budget from "./containers/Budget";
import Settings from "./containers/Settings";
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Dashboard} />
        <Route path="/budgets/:id" component={Budget} />
        <Route path="/create" component={Budget} />
        <Route path="/Settings" component={Settings} />
      </Switch>
    );
    return (
      <div className="App">
        Hello World
        {/* <header className="App-header">Hello World</header> */}
        {routes}
      </div>
    );
  }
}

export default App;
