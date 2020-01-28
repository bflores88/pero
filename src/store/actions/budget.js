import * as actionTypes from "./actionTypes";

export const fetchBudgetsStart = () => {
  return {
    type: actionTypes.FETCH_BUDGETS_START
  };
};

export const fetchBudgets = () => {
  return dispatch => {
    dispatch(fetchBudgetsStart());
    return fetch(`/api/budgets`)
      .then(response => {
        if (response.status !== 200) {
          return { error: "Internal server error." };
        }
        return response.json();
      })
      .then(budgets => {
        if (budgets.error) {
          return dispatch({
            type: actionTypes.FETCH_BUDGETS_FAIL,
            error: budgets.error
          });
        }

        return dispatch({
          type: actionTypes.FETCH_BUDGETS_SUCCESS,
          budgets: budgets
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const getSingleBudget = budgetId => {
  return dispatch => {
    dispatch(fetchBudgetsStart());
    return fetch(`/api/ledger/${budgetId}`)
      .then(response => {
        if (response.status !== 200) {
          return { error: "Internal server error." };
        }
        return response.json();
      })
      .then(budget => {
        console.log(budget);
        if (budget.error) {
          return dispatch({
            type: actionTypes.FETCH_BUDGETS_FAIL,
            error: budget.error
          });
        }
        return dispatch({
          type: actionTypes.SINGLE_BUDGET,
          singleBudget: budget
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};
