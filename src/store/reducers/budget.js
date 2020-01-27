import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  budgets: [],
  loading: false,
  error: null,
  singleBudget: null
};

const fetchBudgetsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchBudgetsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const fetchBudgetsSuccess = (state, action) => {
  return updateObject(state, { loading: false, budgets: action.budgets });
};

const singleBudget = (state, action) => {
  const allBudgets = state.budgets;
  const singleBudget = allBudgets.filter(budget => {
    return budget.budget_id === parseInt(action.budgetId);
  });
  return updateObject(state, { loading: false, singleBudget: singleBudget });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUDGETS_START:
      return fetchBudgetsStart(state, action);
    case actionTypes.FETCH_BUDGETS_FAIL:
      return fetchBudgetsFail(state, action);
    case actionTypes.FETCH_BUDGETS_SUCCESS:
      return fetchBudgetsSuccess(state, action);
    case actionTypes.SINGLE_BUDGET:
      return singleBudget(state, action);
    default:
      return state;
  }
};

export default reducer;
