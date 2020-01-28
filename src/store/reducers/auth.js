import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  roleId: null,
  loading: false,
  error: null
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authSuccess = (state, action) => {
  const updatedData = {
    userId: action.userData.id,
    username: action.userData.username,
    firstName: action.userData.first_name,
    lastName: action.userData.last_name,
    email: action.userData.email,
    roleId: action.userData.role_id,
    loading: false
  };

  return updateObject(state, updatedData);
};

const authValidate = (state, action) => {
  return updateObject(state, action.userData);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_VALIDATE:
      return authValidate(state, action);
    default:
      return state;
  }
};

export default reducer;
