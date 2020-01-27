import React, { Component } from "react";
import Entry from "../../components/UI/Entry";
import AuthInput from "../../components/UI/AuthInput";
import { updateObject, checkValidity } from "../../shared/utility";
import "./Register.scss";

class Register extends Component {
  state = {
    newUserData: {
      first_name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First Name"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      }
    }
  };

  inputChangedHandler = (event, dataName) => {
    const updatedNewUserData = updateObject(this.state.newUserData, {
      [dataName]: updateObject(this.state.newUserData[dataName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.newUserData[dataName].validation
        ),
        touched: true
      })
    });

    this.setState({ newUserData: updatedNewUserData });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.newUserData) {
      formElementsArray.push({
        id: key,
        config: this.state.newUserData[key]
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
      <Entry>
        <h1>Create Account</h1>
        <form>{form}</form>
      </Entry>
    );
  }
}

export default Register;
