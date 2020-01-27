import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import AuthInput from "../../../components/UI/AuthInput";
import "./Login.scss";

class Login extends Component {
  state = {
    loginData: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "username"
        },
        value: "",
        validation: {
          required: false
        }
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password"
        },
        value: "",
        validation: {
          required: false
        }
      }
    }
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      ...this.state
    };
    this.props.login(data);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginData) {
      formElementsArray.push({
        id: key,
        config: this.state.loginData[key]
      });
    }

    let form = formElementsArray.map(formElement => {
      return (
        <AuthInput
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    return (
      <div className="login">
        <form>
          {form}
          <button onClick={this.onSubmit}>Login</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(actions.login(credentials))
  };
};

export default connect(null, mapDispatchToProps)(Login);
