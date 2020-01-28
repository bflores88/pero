import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const login = credentials => {
  return dispatch => {
    dispatch(authStart());
    return fetch(`/api/auth/login`, {
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
          return dispatch({
            type: actionTypes.AUTH_FAIL,
            error: body.error
          });
        } else {
          const userData = {
            userId: body.id,
            username: body.username,
            roleId: body.role_id
          };
          sessionStorage.setItem("userData", JSON.stringify(userData));
          return dispatch({
            type: actionTypes.AUTH_SUCCESS,
            userData: body
          });
        }
      })
      .catch(error => console.error(error));
  };
};

export const authValidate = () => {
  return dispatch => {
    const checkLogIn = sessionStorage.getItem("userData");
    return dispatch({
      type: actionTypes.AUTH_VALIDATE,
      userData: checkLogIn
    });
  };
};
