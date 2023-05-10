import LayoutAuthentication from 'layouts/LayoutAuthentication';
import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from 'stores/configureStore';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RequiredAuthPage from 'pages/RequiredAuthPage';
const LoginPage = lazy(() => import('pages/auths/login'));
const SignUpPage = lazy(() => import('pages/auths/signup'));
const ForgotPage = lazy(() => import('pages/auths/forgot'));
const AdminDashboardPage = lazy(() => import('pages/admins'));
const AdminCategoryPage = lazy(() => import('pages/admins/categories'));
const AdminProductPage = lazy(() => import('pages/admins/products'));
const AdminBillPage = lazy(() => import('pages/admins/bills'));
const AdminAccountPage = lazy(() => import('pages/admins/accounts'));
const AdminSettingPage = lazy(() => import('pages/admins/settings'));
const AdminAuthorPage = lazy(() => import('pages/admins/authors'));
const VerifyPage = lazy(() => import('pages/auths/verify'));

const container = document.getElementById('root');
const router = createBrowserRouter([
  {
    element: <LayoutAuthentication></LayoutAuthentication>,
    children: [
      {
        path: '/login',
        element: <LoginPage></LoginPage>,
      },
      {
        path: '/signup',
        element: <SignUpPage></SignUpPage>,
      },
      {
        path: '/forgot',
        element: <ForgotPage></ForgotPage>,
      },
      {
        path: '/verify/:id/:loginString',
        element: <VerifyPage></VerifyPage>,
      },
    ],
  },
  {
    element: <RequiredAuthPage allowPermissions={['user']}></RequiredAuthPage>,
    children: [
      {
        path: '/admin',
        element: <>I'm here</>,
      },
    ],
  },
  // {
  //   path: '/admin',
  //   children: [
  //     {
  //       path: '/home',
  //       element: <AdminDashboardPage></AdminDashboardPage>,
  //     },
  //     {
  //       path: '/cate',
  //       element: <AdminCategoryPage></AdminCategoryPage>,
  //     },
  //     {
  //       path: '/product',
  //       element: <AdminProductPage></AdminProductPage>,
  //     },
  //     {
  //       path: '/bill',
  //       element: <AdminBillPage></AdminBillPage>,
  //     },
  //     {
  //       path: '/account',
  //       element: <AdminAccountPage></AdminAccountPage>,
  //     },
  //     {
  //       path: '/author',
  //       element: <AdminAuthorPage></AdminAuthorPage>,
  //     },
  //     {
  //       path: '/setting',
  //       element: <AdminSettingPage></AdminSettingPage>,
  //     },
  //   ],
  // },
]);

createRoot(container).render(
  <Provider store={store}>
    <Suspense>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Suspense>
    <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
