import React, { Component } from "react";
import "./Budget.scss";

import BudgetCategory from "./BudgetCategory";

class Budget extends Component {
  state = {
    budget_id: 0,
    budget_name: "",
    description: "",
    is_shared: true,
    categories: []
  };

  componentDidMount() {
    const updatedState = {
      budget_id: this.props.budget.budget_id,
      budget_name: this.props.budget.budget_name,
      description: this.props.budget.description,
      is_shared: this.props.budget.is_shared,
      categories: this.props.budget.categories
    };

    this.setState(updatedState);
  }

  componentDidUpdate(prevProps) {
    if (this.props.budget !== prevProps.budget) {
      const updatedState = {
        budget_id: this.props.budget.budget_id,
        budget_name: this.props.budget.budget_name,
        description: this.props.budget.description,
        is_shared: this.props.budget.is_shared,
        categories: this.props.budget.categories
      };

      this.setState(updatedState);
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onAddCategory = e => {
    e.preventDefault();
    let newCategories = [...this.state.categories];
    newCategories.push({
      category: { category_name: "new category" }
    });

    this.setState(prevState => ({
      categories: newCategories
    }));
  };

  render() {
    let categories = null;
    if (this.state.categories) {
      categories = this.state.categories.map((category, idx) => {
        return <BudgetCategory key={idx} category={category} />;
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
        <div className="new-category-div">
          <button onClick={this.onAddCategory} className="new new-category-btn">
            + new category
          </button>
        </div>
      </div>
    );
  }
}

export default Budget;
