import React, { Component } from "react";
import "./BudgetCategory.scss";

import BudgetItem from "./BudgetItem";

class BudgetCategory extends Component {
  state = {
    account_id: 0,
    category_id: 0,
    category_name: "New Category",
    subcategories: []
  };

  componentDidMount() {
    if (this.props.category) {
      for (let key in this.props.category) {
        this.setState({
          [key]: this.props.category[key]
        });
      }
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onAddSubcategory = e => {
    e.preventDefault();
    let newSubcategories = [...this.state.subcategories];
    newSubcategories.push({
      subcategory: { subcategory_name: "new item" }
    });

    this.setState(prevState => ({
      subcategories: newSubcategories
    }));
  };

  render() {
    let subcategories = null;
    if (this.state.subcategories) {
      subcategories = this.state.subcategories.map((cat, idx) => (
        <BudgetItem key={idx} subcategory={cat} />
      ));
    }

    let categoryClass =
      this.state.category_id > 0 ? "category" : "category new-category";

    return (
      <>
        <div className={categoryClass}>
          <table>
            <thead>
              <tr className="header-border">
                <th className="cat-name">
                  <input
                    className="category-name"
                    type="text"
                    name="category_name"
                    value={this.state.category_name}
                    placeholder={this.state.category_name}
                    onChange={this.onChangeHandler}
                  />
                </th>
                <th className="amount">
                  <p className="budgeted">Budgeted</p>
                </th>
                <th className="amount">
                  <p className="actual">Actual</p>
                </th>
              </tr>
            </thead>
            <tbody>{subcategories}</tbody>
          </table>
          <button className="new new-item-btn" onClick={this.onAddSubcategory}>
            + new item
          </button>
        </div>
      </>
    );
  }
}

export default BudgetCategory;
