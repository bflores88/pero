import React, { Component } from "react";
import "./BudgetItem.scss";

class BudgetItem extends Component {
  state = {
    ledger_id: 0,
    subcategory_id: 0,
    subcategory_name: "",
    budget_amount: 0,
    actual_amount: 0
  };

  componentDidMount() {
    this.setState({
      ledger_id: this.props.subcategory.ledger_id,
      subcategory_id: this.props.subcategory.subcategory_id,
      subcategory_name: this.props.subcategory.subcategory_name,
      budget_amount: this.props.subcategory.budget_amount,
      actual_amount: this.props.subcategory.actual_amount
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
      <div className="budget-item">
        <input
          className="budget-item-name"
          type="text"
          name="subcategory_name"
          value={this.state.subcategory_name}
          placeholder={this.state.subcategory_name}
        />
        <input
          className="amount budgeted"
          type="number"
          name="budget_amount"
          value={this.state.budget_amount}
          placeholder={this.state.budget_amount}
        />
        <input
          className="amount actual"
          type="number"
          name="actual_amount"
          value={this.state.actual_amount}
          placeholder={this.state.actual_amount}
        />
      </div>
    );
  }
}

export default BudgetItem;
