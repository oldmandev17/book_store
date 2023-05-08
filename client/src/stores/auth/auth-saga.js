import { takeLatest } from 'redux-saga/effects';
import {
  handleAuthLogin,
  handleAuthLogout,
  handleAuthRefreshToken,
  handleAuthSignup,
} from './auth-handlers';
import {
  authLogin,
  authLogout,
  authRefreshToken,
  authSignup,
} from './auth-slice';

export default function* authSaga() {
  yield takeLatest(authSignup.type, handleAuthSignup);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authLogout.type, handleAuthLogout);
}
