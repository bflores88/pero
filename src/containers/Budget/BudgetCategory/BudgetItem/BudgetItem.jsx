import React, { Component } from "react";
import "./BudgetItem.scss";

class BudgetItem extends Component {
  render() {
    return (
      <div className="budget-item">
        <input
          className="budget-item-name"
          type="text"
          value=""
          placeholder=""
        />
        <input
          className="amount budgeted"
          type="number"
          value=""
          placeholder=""
        />
        <input
          className="amount actual"
          type="number"
          value=""
          placeholder=""
        />
      </div>
    );
  }
}

export default BudgetItem;
