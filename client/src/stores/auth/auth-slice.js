const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    accessToken: null,
    show: false,
  },
  reducers: {
    authLogin: (state, action) => ({
      ...state,
      show: state.show,
    }),

    authSignup: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    authUpdateShow: (state, action) => ({
      ...state,
      show: action.payload,
    }),

    authUpdateUser: (state, action) => ({
      show: state.show,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),

    authFetchMe: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    authRefreshToken: (state, action) => ({
      ...state,
    }),

    authLogout: (state, action) => ({}),
  },
});

export const {
  authLogin,
  authSignup,
  authUpdateShow,
  authUpdateUser,
  authFetchMe,
  authRefreshToken,
  authLogout,
} = authSlice.actions;

export default authSlice.reducer;
