import { Button } from 'component/button';
import 'index.css';
import { useDispatch } from 'react-redux';
import { authLogout } from 'stores/auth/auth-slice';
import { getToken } from 'utils/auth';

export default function Verify(props) {
  const dispatch = useDispatch();
  const handleAuthLogout = () => {
    const { refresh_token } = getToken();
    if (refresh_token) dispatch(authLogout(refresh_token));
  };
  return (
    <>
      <Button onClick={handleAuthLogout} kind="primary">
        Tiếp tục
      </Button>
    </>
  );
}
