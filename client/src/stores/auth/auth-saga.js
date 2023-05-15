import { takeLatest } from 'redux-saga/effects';
import {
  handleAuthLogin,
  handleAuthLogout,
  handleAuthRefreshToken,
  handleAuthRequestPasswordReset,
  handleAuthResetPassword,
  handleAuthSignup,
  handleAuthVerified,
} from './auth-handlers';
import {
  authLogin,
  authLogout,
  authRefreshToken,
  authRequestPasswordReset,
  authResetPassword,
  authSignup,
  authVerified,
} from './auth-slice';

export default function* authSaga() {
  yield takeLatest(authSignup.type, handleAuthSignup);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authLogout.type, handleAuthLogout);
  yield takeLatest(
    authRequestPasswordReset.type,
    handleAuthRequestPasswordReset
  );
  yield takeLatest(authResetPassword.type, handleAuthResetPassword);
  yield takeLatest(authVerified.type, handleAuthVerified);
}
