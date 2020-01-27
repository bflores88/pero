import React, { Component } from "react";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Dashboard.scss";

import Budget from "../Budget";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.getBudgets();
    this.setState({
      budgets: this.props.budgets
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.budgets !== prevProps.budgets) {
      this.setState({
        budgets: this.props.budgets
      });
    }
  }

  render() {
    let budgets = null;
    if (this.state.budgets) {
      budgets = this.state.budgets.map(budget => {
        return (
          <li>
            <Link key={budget.budget_id} to={`/budgets/${budget.budget_id}`}>
              {budget.budget_name}
            </Link>
          </li>
        );
      });
    }

    return (
      <div className="dashboard">
        Dashboard Component<ul>{budgets}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.budget.loading,
    budgets: state.budget.budgets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBudgets: () => dispatch(actions.fetchBudgets())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
