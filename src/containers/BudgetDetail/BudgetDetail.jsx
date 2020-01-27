import React, { Component } from "react";
import "./BudgetDetail.scss";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

import Budget from "../Budget";

class BudgetDetail extends Component {
  state = {};

  componentDidMount() {
    this.props.getBudget(this.props.match.params.id);
  }
  render() {
    let render = <h1>Loading</h1>;
    if (this.props.budgetDetail) {
      render = <Budget budget={this.props.budgetDetail[0]} />;
    }
    console.log(this.props.budgetDetail);
    return <>{render}</>;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.budget.loading,
    budgetDetail: state.budget.singleBudget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBudget: budgetId => dispatch(actions.getSingleBudget(budgetId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetDetail);
