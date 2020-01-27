import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Auth.scss";

import Entry from "../../components/UI/Entry";
import Login from "./Login";
class Auth extends Component {
  state = {};

  render() {
    let render = (
      <>
        <h2>Log in to continue.</h2>
        <Login />
        <p>
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
      </>
    );

    if (this.props.isLoading) {
      render = <h1>Loading</h1>;
    }

    if (this.props.isAuthenticated) {
      render = <Redirect to="/" />;
    }

    return (
      <>
        <Helmet>
          <title>Log In - Pero</title>
        </Helmet>
        <Entry>{render}</Entry>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading,
    isAuthenticated: state.auth.username !== null
  };
};

export default connect(mapStateToProps)(Auth);
