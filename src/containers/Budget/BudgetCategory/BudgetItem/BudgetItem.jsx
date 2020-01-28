import React, { Component } from "react";
import "./BudgetItem.scss";

class BudgetItem extends Component {
  state = {
    ledger_id: 0,
    subcategory_id: 0,
    subcategory_name: "New item",
    budget_amount: 0.0,
    actual_amount: 0.0,
    itemTimeOut: { current: null },
    budgetTimeout: { current: null },
    actualTimeout: { current: null }
  };

  componentDidMount() {
    if (this.props.subcategory) {
      for (let key in this.props.subcategory) {
        this.setState({
          [key]: this.props.subcategory[key]
        });
      }
    }
  }

  onChangeHandler = e => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    });

    clearTimeout(this.state.itemTimeOut.current);

    // save to db here
    this.setState({
      itemTimeOut: { current: setTimeout(() => console.log(value), 1000) }
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

    if (e.target.name === "budget_amount") {
      clearTimeout(this.state.budgetTimeout.current);

      // save to db here
      this.setState({
        budgetTimeout: {
          current: setTimeout(() => console.log(newAmount), 1000)
        }
      });
    } else {
      clearTimeout(this.state.actualTimeout.current);

      // save to db here
      this.setState({
        actualTimeout: {
          current: setTimeout(() => console.log(newAmount), 1000)
        }
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
            placeholder={this.state.subcategory_name || " item name"}
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
    );
  }
}

export default BudgetItem;
