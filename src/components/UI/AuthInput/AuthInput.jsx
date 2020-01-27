import React from "react";
import "./AuthInput.scss";

const authInput = props => {
  let inputElement = null;
  const inputClasses = ["input-element"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          <label
            className="register-label"
            htmlFor={props.elementConfig.placeholder}
          >
            {props.elementConfig.placeholder}
          </label>
        </>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className="input-element"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default authInput;
