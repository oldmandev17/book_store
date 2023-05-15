import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import { logout, saveToken } from 'utils/auth';
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthLogout,
  requestAuthRefreshToken,
  requestAuthRequestPasswordReset,
  requestAuthResetPassword,
  requestAuthSignup,
  requestAuthVerified,
} from './auth-requests';
import {
  authUpdateRedirect,
  authUpdateShowForgot,
  authUpdateShowSignup,
  authUpdateUser,
} from './auth-slice';

function* handleAuthSignup({ payload }) {
  try {
    const response = yield call(requestAuthSignup, payload);
    if (response.status === 201) yield put(authUpdateShowSignup(true));
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthLogin({ payload }) {
  try {
    const response = yield call(requestAuthLogin, payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.status === 200)
      yield put(
        authUpdateUser({
          user: response.data.profile,
          accessToken: payload,
        })
      );
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response.status === 200) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    } else {
      yield handleAuthLogout();
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthLogout({ payload }) {
  try {
    logout();
    yield put(
      authUpdateUser({
        user: undefined,
        accessToken: null,
      })
    );
    yield call(requestAuthLogout, payload);
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthRequestPasswordReset({ payload }) {
  try {
    const response = yield call(requestAuthRequestPasswordReset, payload);
    if (response.status === 200) yield put(authUpdateShowForgot(true));
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthResetPassword({ payload }) {
  try {
    const response = yield call(requestAuthResetPassword, payload);
    if (response.status === 200) {
      yield put(authUpdateRedirect('/login'));
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthVerified({ payload }) {
  try {
    const response = yield call(requestAuthVerified, payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    }
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

export {
  handleAuthSignup,
  handleAuthLogin,
  handleAuthFetchMe,
  handleAuthRefreshToken,
  handleAuthLogout,
  handleAuthRequestPasswordReset,
  handleAuthResetPassword,
  handleAuthVerified,
};
