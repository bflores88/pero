import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Auth.scss";

import Entry from "../../components/UI/Entry";
import Login from "./Login";
class Auth extends Component {
  state = {
    error: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.authError !== prevProps.authError) {
      this.setState({ error: this.props.authError });
    }
  }

  render() {
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = <p className="auth-error">{this.state.error}</p>;
    }

    let render = (
      <>
        <h2>Log in to continue</h2>
        {errorMessage}
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
          <title>Login | Pero</title>
        </Helmet>
        <Entry>
          <div className="auth">{render}</div>
        </Entry>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading,
    isAuthenticated: state.auth.username !== null,
    authError: state.auth.error
  };
};

export default connect(mapStateToProps)(Auth);
