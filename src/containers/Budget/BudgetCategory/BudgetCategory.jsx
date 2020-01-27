import React, { Component } from "react";
import "./BudgetCategory.scss";

import BudgetItem from "./BudgetItem";

class BudgetCategory extends Component {
  state = {
    account_id: 0,
    category_id: 0,
    category_name: ""
  };

  componentDidMount() {
    this.setState({
      account_id: this.props.category.account_id,
      category_id: this.props.category.category_id,
      category_name: this.props.category.category_name
    });
  }

  onChangeHandler = e => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const subcategories = this.props.category.subcategories.map(cat => (
      <BudgetItem subcategory={cat} />
    ));

    return (
      <div className="category">
        <h4>
          <input
            className="category-name"
            type="text"
            name="category_name"
            value={this.state.category_name}
            placeholder={this.state.category_name}
          />
        </h4>
        {subcategories}
      </div>
    );
  }
}

export default BudgetCategory;
