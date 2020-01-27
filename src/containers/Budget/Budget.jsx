import React, { Component } from "react";
import "./Budget.scss";

import { updateObject } from "../../shared/utility";

import BudgetCategory from "./BudgetCategory";

class Budget extends Component {
  state = {
    budget_id: 0,
    budget_name: "",
    description: "",
    is_shared: true
  };

  componentDidMount() {
    const updatedState = {
      budget_id: this.props.budget.budget_id,
      budget_name: this.props.budget.budget_name,
      description: this.props.budget.description,
      is_shared: this.props.budget.is_shared
    };

    this.setState(updatedState);
  }

  componentDidUpdate(prevProps) {
    if (this.props.budget !== prevProps.budget) {
      const updatedState = {
        budget_id: this.props.budget.budget_id,
        budget_name: this.props.budget.budget_name,
        description: this.props.budget.description,
        is_shared: this.props.budget.is_shared
      };

      this.setState(updatedState);
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let categories = null;
    if (this.props.budget) {
      categories = this.props.budget.categories.map(category => {
        return (
          <BudgetCategory key={category.category_id} category={category} />
        );
      });
    }
    return (
      <div className="budget">
        <h3>
          <input
            className="budget-name"
            type="text"
            name="budget_name"
            value={this.state.budget_name}
            placeholder={this.state.budget_name || "Budget Name"}
            onChange={this.onChangeHandler}
          />
        </h3>
        <summary>
          <input
            className="budget-description"
            type="text"
            name="description"
            value={this.state.description}
            placeholder={this.state.description || "Add description"}
            onChange={this.onChangeHandler}
          />
        </summary>
        {categories}
      </div>
    );
  }
}

export default Budget;
