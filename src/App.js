import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";

class App extends Component {
  render() {
    let routes = <Switch>{/* <Route path="/auth" component={} /> */}</Switch>;
    return (
      <div className="App">
        <header className="App-header">Hello Wordl</header>
      </div>
    );
  }
}

export default App;
