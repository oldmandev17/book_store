const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    accessToken: null,
    showSignup: false,
    showForgot: false,
  },
  reducers: {
    authLogin: (state, action) => ({
      ...state,
    }),

    authSignup: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    authUpdateShowSignup: (state, action) => ({
      ...state,
      showForgot: state.showForgot,
      showSignup: action.payload,
    }),

    authUpdateUser: (state, action) => ({
      showSignup: state.showSignup,
      showForgot: state.showForgot,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),

    authFetchMe: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    authRefreshToken: (state, action) => ({
      showSignup: state.showSignup,
      showForgot: state.showForgot,
    }),

    authLogout: (state, action) => ({}),

    authUpdateShowForgot: (state, action) => ({
      ...state,
      showSignup: state.showSignup,
      showForgot: action.payload,
    }),

    authRequestPasswordReset: (state, action) => ({
      showSignup: state.showSignup,
      showForgot: state.showForgot,
    }),

    authResetPassword: (state, action) => ({}),
  },
});

export const {
  authLogin,
  authSignup,
  authUpdateShowSignup,
  authUpdateUser,
  authFetchMe,
  authRefreshToken,
  authLogout,
  authRequestPasswordReset,
  authUpdateShowForgot,
  authResetPassword,
} = authSlice.actions;

export default authSlice.reducer;
