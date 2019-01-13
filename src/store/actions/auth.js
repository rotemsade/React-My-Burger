import axios from "axios";

import * as actionTypes from "./actionsTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime*1000);
  };
};

export const auth = (email, password, isSignup) => {
  let url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDazsP7ZQXtczANpu_WEEzLXsvn3L6says";
  if (!isSignup) {
    url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDazsP7ZQXtczANpu_WEEzLXsvn3L6says";
  }
  return async dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    try {
      const res = await axios.post(url, authData);
      console.log(res);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
      console.log(err);
      dispatch(authFail(err.response.data.error));
    }
  };
};
