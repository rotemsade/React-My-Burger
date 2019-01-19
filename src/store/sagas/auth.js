import { delay } from "redux-saga";
import { put } from "redux-saga/effects";
import axios from "axios";

import * as authActions from "../actions/index";

export function* logoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationTime");
  yield localStorage.removeItem("userId");
  yield put(authActions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(authActions.logout());
}

export function* authUserSaga(action) {
  yield put(authActions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDazsP7ZQXtczANpu_WEEzLXsvn3L6says";
  if (!action.isSignup) {
    url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDazsP7ZQXtczANpu_WEEzLXsvn3L6says";
  }
  try {
    const res = yield axios.post(url, authData);
    const expirationTime = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expirationTime", expirationTime);
    yield localStorage.setItem("userId", res.data.localId);
    yield put(authActions.authSuccess(res.data.idToken, res.data.localId));
    yield put(authActions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(authActions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(authActions.logout());
  } else {
    const expirationTime = yield new Date(
      localStorage.getItem("expirationTime")
    );
    if (expirationTime > new Date()) {
      yield put(authActions.authSuccess(token, localStorage.getItem("userId")));
      yield put(
        authActions.checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(authActions.logout());
    }
  }
}
