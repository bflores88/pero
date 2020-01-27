import * as actionTypes from "./actionTypes";
import API_ROOT from "../../api-config";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const login = credentials => {
  return dispatch => {
    dispatch(authStart());
    return fetch(`${API_ROOT}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return { error: "Bad Username or Password.  Try again!" };
        }
      })
      .then(body => {
        if (body.error) {
          console.log("error");
          return dispatch({
            type: actionTypes.AUTH_FAIL,
            error: body.error
          });
        } else {
          return dispatch({
            type: actionTypes.AUTH_SUCCESS,
            userData: body
          });
        }
      })
      .catch(error => console.error(error));
  };
};
