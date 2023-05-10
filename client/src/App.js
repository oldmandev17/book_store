import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRefreshToken, authUpdateUser } from 'stores/auth/auth-slice';
import { getToken, logout } from 'utils/auth';

function App({ children }) {
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
  return <>{children}</>;
}

export default App;
