import AuthLayout from 'layouts/AuthLayout';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authRefreshToken, authUpdateUser } from 'stores/auth/auth-slice';
import { getToken, logout } from 'utils/auth';
const Login = lazy(() => import('pages/auths/login'));
const SignUp = lazy(() => import('pages/auths/signup'));
const Forgot = lazy(() => import('pages/auths/forgot'));
const AdminPage = lazy(() => import('pages/admins'));
const Category = lazy(() => import('pages/admins/categories'));
const Product = lazy(() => import('pages/admins/products'));
const Bill = lazy(() => import('pages/admins/bills'));
const Account = lazy(() => import('pages/admins/accounts'));
const Setting = lazy(() => import('pages/admins/settings'));
const Author = lazy(() => import('pages/admins/authors'));
const Verify = lazy(() => import('pages/auths/verify'));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user && user._id) {
      const { access_token } = getToken();
      dispatch(
        authUpdateUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      console.log("working")
      const { refresh_token } = getToken();
      if (refresh_token) dispatch(authRefreshToken(refresh_token));
      else {
        dispatch(
          authUpdateUser({
            user: undefined,
            accessToken: null,
          })
        );
        logout();
      }
    }
  }, [dispatch, user]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify/:id/:loginString" element={<Verify />} />
        </Route>
        <Route path="admin">
          <Route path="home" element={<AdminPage />} />
          <Route path="cate" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="bill" element={<Bill />} />
          <Route path="account" element={<Account />} />
          <Route path="setting" element={<Setting />} />
          <Route path="author" element={<Author />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
