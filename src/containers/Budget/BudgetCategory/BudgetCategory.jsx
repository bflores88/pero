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
    let subcategories = null;
    if (this.props.category) {
      subcategories = this.props.category.subcategories.map(cat => (
        <BudgetItem key={cat.subcategory_id} subcategory={cat} />
      ));
    }

    return (
      <>
        <div className="category">
          <table>
            <tr>
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
            {subcategories}
          </table>
        </div>
      </>
    );

    // return (
    //   <>
    //   <div className="category">
    //       <div className="category-header">
    //         <input
    //           className="category-name"
    //           type="text"
    //           name="category_name"
    //           value={this.state.category_name}
    //           placeholder={this.state.category_name}
    //           onChange={this.onChangeHandler}
    //         />
    //         <span className="budgeted">Budgeted</span>
    //         <span className="actual">Actual</span>
    //       </div>
    //       <div>{subcategories}</div>
    //     </div>
    //   </>
    // );
  }
}

export default BudgetCategory;
