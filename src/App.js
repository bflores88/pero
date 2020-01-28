import React, { Component } from "react";
import * as actions from "./store/actions";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";

import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";
import Budget from "./containers/Budget";
import Settings from "./containers/Settings";
import Register from "./containers/Register";
import BudgetDetail from "./containers/BudgetDetail";
class App extends Component {
  componentDidMount() {
    this.props.checkStatus();
  }
  render() {
    console.log(this.props.isAuthenticated);
    let routes = (
      <Switch>
        <Route path="/budgets/:id" component={BudgetDetail} />
        <Route path="/create" component={Budget} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    );

    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      );
    }
    return <div className="App">{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.username === null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkStatus: () => dispatch(actions.authValidate())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
