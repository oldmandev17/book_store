import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import { logout, saveToken } from 'utils/auth';
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthLogout,
  requestAuthRefreshToken,
  requestAuthSignup,
} from './auth-requests';
import { authUpdateShow, authUpdateUser } from './auth-slice';

function* handleAuthSignup({ payload }) {
  try {
    const response = yield call(requestAuthSignup, payload);
    if (response.status === 201) yield put(authUpdateShow(true));
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
    yield 1;
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
}

function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.data)
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

export {
  handleAuthSignup,
  handleAuthLogin,
  handleAuthFetchMe,
  handleAuthRefreshToken,
  handleAuthLogout,
};
