import React, { Component } from "react";
import "./Budget.scss";

class Budget extends Component {
  state = {
    budget_id: 0,
    budget_name: "",
    description: "",
    is_shared: true
  };

  componentDidMount() {
    this.setState({
      budget_id: this.props.budget_id,
      budget_name: this.props.budget_name,
      description: this.props.description,
      is_shared: this.props.is_shared
    });
  }

  onChangeHandler = e => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="budget">
        <h3>
          <input
            className="budget-name"
            type="text"
            name="budget_name"
            value={this.state.budget_name}
            placeholder={this.state.budget_name || "Budget Name"}
          />
        </h3>
        <summary>
          <input
            className="budget-description"
            type="text"
            name="description"
            value={this.state.description}
            placeholder={this.state.description || "Add description"}
          />
        </summary>
      </div>
    );
  }
}

export default Budget;
