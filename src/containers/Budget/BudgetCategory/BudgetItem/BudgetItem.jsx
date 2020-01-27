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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeDollarHandler = e => {
    let newAmount = e.target.value;
    if (Number(newAmount) || newAmount === "") {
      if (Number(newAmount) % 1 > 0) {
        let decimalIndex = newAmount.indexOf(".");
        newAmount = newAmount.slice(0, decimalIndex + 3);
      }
      this.setState({
        [e.target.name]: newAmount || ""
      });
    }
  };

  render() {
    return (
      <tr className="budget-item">
        <td className="item-name">
          <input
            className="item-detail budget-item-name"
            type="text"
            name="subcategory_name"
            value={this.state.subcategory_name}
            placeholder={this.state.subcategory_name}
            onChange={this.onChangeHandler}
          />
        </td>
        <td className="item-amount">
          <input
            className="item-detail amount budgeted"
            type="text"
            name="budget_amount"
            value={this.state.budget_amount}
            placeholder={this.state.budget_amount}
            onChange={this.onChangeDollarHandler}
          />
        </td>
        <td className="item-amount">
          <input
            className="item-detail amount actual"
            type="text"
            name="actual_amount"
            value={this.state.actual_amount}
            placeholder={this.state.actual_amount}
            onChange={this.onChangeDollarHandler}
          />
        </td>
      </tr>
      // <div className="budget-item">
      //   <input
      //     className="item-detail budget-item-name"
      //     type="text"
      //     name="subcategory_name"
      //     value={this.state.subcategory_name}
      //     placeholder={this.state.subcategory_name}
      //     onChange={this.onChangeHandler}
      //   />
      //   <input
      //     className="item-detail amount budgeted"
      //     type="text"
      //     name="budget_amount"
      //     value={this.state.budget_amount}
      //     placeholder={this.state.budget_amount}
      //     onChange={this.onChangeDollarHandler}
      //   />
      //   <input
      //     className="item-detail amount actual"
      //     type="text"
      //     name="actual_amount"
      //     value={this.state.actual_amount}
      //     placeholder={this.state.actual_amount}
      //     onChange={this.onChangeDollarHandler}
      //   />
      // </div>
    );
  }
}

export default BudgetItem;
